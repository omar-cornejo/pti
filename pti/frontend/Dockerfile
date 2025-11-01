# Imagen base
FROM node:20

# Carpeta de trabajo
WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Comando para desarrollo (puedes cambiarlo por 'npm run build' + 'npm run preview' si quieres producción)
CMD ["npm", "run", "dev", "--", "--host"]
