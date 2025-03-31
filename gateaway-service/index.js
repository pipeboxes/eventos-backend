const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Ruta inicial de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Gateaway Service funcionando correctamente 🚀' });
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Gateaway Service escuchando en el puerto ${PORT}`);
});