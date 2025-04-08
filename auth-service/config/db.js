const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // sin path para que funcione bien en Docker

console.log('📌 Variables:', {
  db: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
});

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST || 'postgresdb', // ← nombre del servicio Docker
    dialect: 'postgres',
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con PostgreSQL:', error);
  }
}

module.exports = { sequelize, connectDB };
