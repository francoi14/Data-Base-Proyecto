const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

router.get('/datos', async (req, res) => {
    try {
        const hoy = new Date();
        const inicioHoy = new Date(hoy.setHours(0,0,0,0));
        
        // 1. Ventas del día
        const ventasHoy = await Venta.aggregate([
            { $match: { fecha: { $gte: inicioHoy } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        // 2. Vencimientos próximos (30 días)
        const limite = new Date();
        limite.setDate(limite.getDate() + 30);
        const porVencer = await Producto.find({ fechaVencimiento: { $gte: hoy, $lte: limite } });

        // 3. Stock agrupado por categoría
        const stockPorCategoria = await Producto.aggregate([
            { $group: { 
                _id: "$categoria", 
                productos: { $push: { nombre: "$nombre", stock: "$stock" } } 
            }}
        ]);

        res.json({
            totalVendido: ventasHoy[0]?.total || 0,
            productosPorVencer: porVencer,
            stockPorCategoria: stockPorCategoria
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;