const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Registrar cliente
router.post('/', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.json(nuevoCliente);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el cliente' });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

// Actualizar un cliente (PUT)
router.put('/:id', async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(clienteActualizado);
    } catch (err) {
        res.status(500).send('Error al actualizar el cliente');
    }
});

// Eliminar un cliente (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Cliente.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (err) {
        res.status(500).send('Error al eliminar el cliente');
    }
});

module.exports = router;