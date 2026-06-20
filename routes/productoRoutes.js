const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Crear o Actualizar stock (POST)
// Si el producto existe, suma el stock y actualiza precio. Si no, crea uno nuevo.
router.post('/', async (req, res) => {
    try {
        const { nombre, precio, stock, categoria, fechaVencimiento } = req.body;
        
        const productoExistente = await Producto.findOne({ nombre: nombre });

        if (productoExistente) {
            productoExistente.stock += parseInt(stock);
            productoExistente.precio = precio;
            await productoExistente.save();
            res.json(productoExistente);
        } else {
            const nuevoProducto = new Producto(req.body);
            await nuevoProducto.save();
            res.json(nuevoProducto);
        }
    } catch (error) {
        res.status(400).json({ error: "Error al guardar producto" });
    }
});

// Actualizar producto (PUT) - Útil para cuando quieras corregir un nombre o dato específico
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