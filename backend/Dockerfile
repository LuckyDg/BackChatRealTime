# Usa una imagen de Node.js como base
FROM node:16-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Expone el puerto que usa tu API
EXPOSE 7788

# Comando para ejecutar tu aplicación
CMD ["node", "server.js"]
