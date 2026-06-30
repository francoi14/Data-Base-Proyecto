const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado'],
    default: 'entregado'
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: false
  }
});

module.exports = mongoose.models.Venta || mongoose.model('Venta', VentaSchema);