const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);