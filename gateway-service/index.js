const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use((req, res, next) => {
  console.log(`Solicitud recibida en el gateway: ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/manual/auth/test', async (req, res) => {
  try {
    console.log('entered manual auth test')
    const response = await axios.get('http://auth-service:4001/api/auth/test');
    res.send(`✅ Auth-service respondió: ${response.data}`);
  } catch (error) {
    console.error('Error al conectar manualmente con auth-service:', error.message);
    res.status(500).send('Falló conexión directa con auth-service');
  }
});

app.post('/api/auth/register', async (req, res) => {
  console.log('User register request received in Gateway');

  try {
    const response = await axios.post('http://auth-service:4001/api/auth/register', req.body);
    console.log('✅ Respuesta del auth-service:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Error al conectar con ruta auth-register:', error.message);
    res.status(500).send('Falló conexión directa con auth-service');
  }
});

app.post('/api/auth/login', async (req, res) => {
  console.log('User login request received in Gateway');

  try {
    const response = await axios.post('http://auth-service:4001/api/auth/login', req.body);
    console.log('✅ Respuesta del auth-service:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('❌ Error al conectar con auth-login:', error.message);
    res.status(500).send('Falló conexión directa con auth-service');
  }
});

app.use(routes);

const PORT = process.env.GATEWAY_PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Gateway corriendo en el puerto ${PORT}`);
});

app.get('/gateway/test', (req, res) => {
  res.send('🚪 Gateway está recibiendo solicitudes correctamente');
});
