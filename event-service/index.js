const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config({ path: '../.env' });

const app = express();

app.use(express.json());
app.use(cors());

// Conexión MongoDB
connectDB();

// Rutas eventos
app.use('/', eventRoutes);

app.get('/', (req, res) => {
  res.send('Event Service funcionando');
});

const PORT = process.env.EVENT_PORT || 4002;
app.listen(PORT, () => {
  console.log(`✅ Event service escuchando en el puerto ${PORT}`);
});
