# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto del auth-service
EXPOSE 4001

# Comando por defecto
CMD ["npm", "start"]
