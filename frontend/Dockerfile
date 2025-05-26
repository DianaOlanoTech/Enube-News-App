# Dockerfile para el frontend de la aplicación Enube-News-App

# Etapa 1: Construcción de la aplicación con Node.js

# Utiliza una imagen base oficial de Node.js
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código fuente y archivos de configuración al contenedor
COPY . .

# Instala las dependencias del frontend
RUN npm install

# Genera la versión optimizada de producción en /app/dist
RUN npm run build

# Etapa 2: Servir archivos estáticos con Nginx

# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Comando por defecto: inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
