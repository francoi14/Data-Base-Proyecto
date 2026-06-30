const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

// Ruta GET 
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.find().populate('cliente').sort({ fecha: -1 });
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { producto, cantidad, total, cliente, estado } = req.body;
    const nuevaVenta = new Venta({ producto, cantidad, total, cliente, estado });
    await nuevaVenta.save();
    // Descontar stock
    await Producto.findByIdAndUpdate(producto, { $inc: { stock: -cantidad } });
    res.json(nuevaVenta);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar venta' });
  }
});

// Ruta para actualizar estado
router.put('/:id/estado', async (req, res) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, { estado: req.body.estado }, { new: true });
    res.json(venta);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

module.exports = router;