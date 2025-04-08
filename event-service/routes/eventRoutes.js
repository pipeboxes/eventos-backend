const express = require('express');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', (req, res, next) => {
    console.log('Llegó un POST a /api/events');
    next();
  }, createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
