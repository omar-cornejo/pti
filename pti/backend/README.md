# Backend Express

Este backend está configurado para usar SQLite a través del paquete `sqlite3` de Node.js. La base de datos se guarda por defecto en `/data/pti.sqlite` a nivel del proyecto.

## ¿Cómo funciona la conexión?
- El archivo `src/db.js` inicializa la base de datos. Si el archivo `/data/pti.sqlite` no existe, lo crea automáticamente.
- Puedes acceder al objeto `db` en tus rutas para hacer consultas SQL.

## Crear tablas
Agrega un script de inicialización a `src/db.js`, o ejecuta comandos SQL manualmente una vez lanzado el backend (recomiendo usar DB Browser for SQLite para gestión visual).

## Ejemplo de uso:
Consulta GET en la ruta `/` muestra las tablas existentes en la base de datos.
