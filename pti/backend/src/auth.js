const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'; // Reemplaza en prod
const TOKEN_EXP = '2h';

// Registro
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos' });
    }
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (user) return res.status(409).json({ error: 'Usuario ya existe' });
        const hash = bcrypt.hashSync(password, 10);
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
            if (err) return res.status(500).json({ error: 'Error al crear' });
            res.status(201).json({ message: 'Usuario registrado' });
        });
    });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos' });
    }
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (!user) return res.status(400).json({ error: 'Usuario/contraseña inválidos' });
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Usuario/contraseña inválidos' });
        }
        const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXP });
        res.json({ token, username: user.username });
    });
});

// Middleware
function loginRequired(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No autenticado' });
    const token = auth.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

module.exports = { router, loginRequired };
