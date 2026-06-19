const express = require('express');
const router = express.Router();

// Asegurate de que los nombres de los archivos coincidan exactamente
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

router.post('/', async (req, res) => {
    try {
        const { productoId, cantidad, total } = req.body;
        
        // Creamos la venta
        const nuevaVenta = new Venta({ producto: productoId, cantidad, total });
        await nuevaVenta.save();

        // Descontamos el stock
        await Producto.findByIdAndUpdate(productoId, { $inc: { stock: -cantidad } });

        res.status(201).json({ mensaje: "Venta registrada" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;