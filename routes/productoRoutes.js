const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// 1. Ruta para crear un producto (POST)
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 2. Ruta para ver todos los productos (GET)
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 3. Ruta para actualizar un producto (PUT)
// Ej: cambiar el precio o restar stock cuando se vende
router.put('/:id', async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Nos devuelve el producto ya modificado
        );
        res.json(productoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
});

// 4. Ruta para borrar un producto (DELETE)
// Ej: sacar un alfajor que ya no se fabrica
router.delete('/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
});

// Exportamos las rutas para que el server.js las pueda usar
module.exports = router;