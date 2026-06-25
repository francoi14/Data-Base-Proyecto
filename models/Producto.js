const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    precio: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    categoria: { type: String, default: 'Almacén' },
    fechaCreacion: { type: Date, default: Date.now },
    fechaVencimiento: { type: Date }
});

module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);