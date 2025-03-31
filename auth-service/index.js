const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conecta y sincroniza Sequelize (PostgreSQL)
connectDB();
sequelize.sync({ force: false }).then(() => {
  console.log('✅ Base de datos sincronizada.');
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Auth Service en ejecución 🚀');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`✅ Auth service escuchando en el puerto ${PORT}`);
});
