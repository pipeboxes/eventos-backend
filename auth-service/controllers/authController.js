const bcrypt = require('bcryptjs');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('📩 Registro recibido:', req.body);

  try {
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error('❌ Error al registrar:', error.message);
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Intento de login:', email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    res.json({
      message: 'Login exitoso.',
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error('❌ Error en login:', error.message);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};
