const express = require('express');
const multer = require('multer');
const { loginRequired } = require('./auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Carpeta temporal, puedes mover luego

router.get('/', (req, res) => {
    res.json({ message: 'Home (mock)' });
});

router.get('/dashboard', loginRequired, (req, res) => {
    res.json({ message: 'Dashboard (mock)' });
});

router.post('/dashboard', loginRequired, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Archivo no enviado' });
    res.json({ message: `Archivo recibido: ${req.file.originalname}` });
});

router.get('/gallery', loginRequired, (req, res) => {
    res.json({ message: 'Gallery (mock)' });
});

router.get('/features', loginRequired, (req, res) => {
    res.json({ message: 'Features (mock)' });
});

router.get('/detection', loginRequired, (req, res) => {
    res.json({ message: 'Detection GET (mock)', detections: null });
});

router.post('/detection', loginRequired, upload.single('image'), (req, res) => {
    // TODO: Integrate real ML model. For now, mock sample detections.
    const detections = [
        {
            label: 'T-shirt',
            icon: '👕',
            tags: ['cotton', 'casual wear'],
            confidence: 96,
            bg_class: 'bg-gradient-to-br from-purple-600/30 to-fuchsia-500/30'
        },
        {
            label: 'Jeans',
            icon: '👖',
            tags: ['denim', 'straight fit', 'casual'],
            confidence: 93,
            bg_class: 'bg-gradient-to-br from-blue-500/30 to-cyan-400/30'
        },
        {
            label: 'Sneakers',
            icon: '👟',
            tags: ['athletic footwear', 'casual material'],
            confidence: 87,
            bg_class: 'bg-gradient-to-br from-green-500/30 to-emerald-500/30'
        }
    ];
    res.json({ message: 'Detection POST (mock)', detections });
});

module.exports = router;
