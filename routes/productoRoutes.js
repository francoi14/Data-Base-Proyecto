const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// Crear producto
router.post('/', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json(nuevoProducto);
});

// Actualizar producto (PUT)
router.put('/:id', async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar" });
    }
});

// Eliminar producto (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar" });
    }
});

module.exports = router;