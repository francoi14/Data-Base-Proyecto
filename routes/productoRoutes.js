const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Ruta para crear un producto (POST)
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Ruta para ver todos los productos (GET)
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;