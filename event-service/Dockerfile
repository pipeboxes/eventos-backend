# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar resto del código
COPY . .

# Exponer el puerto del event-service
EXPOSE 4002

# Comando para ejecutar el servicio
CMD ["npm", "start"]
