# Imagen base
FROM node:20

# Carpeta de trabajo
WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Crear carpeta para la base de datos
RUN mkdir -p /app/data

# Exponemos el puerto
EXPOSE 3001

# Comando para ejecutar el backend
CMD ["node", "src/index.js"]
