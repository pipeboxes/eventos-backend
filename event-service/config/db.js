const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/eventosdb';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB conectado correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error);
  }
};

module.exports = connectDB;
