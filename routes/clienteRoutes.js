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

module.exports = router;