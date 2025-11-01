const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Carpeta para guardar la base de datos (apunta a /data/pti.sqlite) (actualmente es realativa al Docker)
const dbPath = path.join(__dirname, '../data/pti.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite en', dbPath);
  }
});

module.exports = db;
