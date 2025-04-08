const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  owner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Event', eventSchema);
