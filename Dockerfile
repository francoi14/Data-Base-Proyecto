# Usamos una imagen liviana de Node.js
FROM node:18-alpine

# Creamos y nos posicionamos en la carpeta de la app dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración de dependencias
COPY package*.json ./

# Instalamos las dependencias del frontend
RUN npm install

# Copiamos todo el código de React
COPY . .

# Exponemos el puerto por defecto de Vite
EXPOSE 5173

# Comando para arrancar el servidor de desarrollo de Vite
# El parámetro --host es obligatorio para que Docker te deje acceder desde el navegador externo
CMD ["npm", "run", "dev", "--", "--host"]