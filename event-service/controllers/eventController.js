const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json(event);
};

exports.createEvent = async (req, res) => {
  try {
    console.log('Body recibido:', req.body);
    console.log('Usuario autenticado:', req.user);
    const newEvent = new Event({
      ...req.body,
      owner: req.user.userId,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error al crear evento:', error.message);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json({ message: 'Evento eliminado' });
};
