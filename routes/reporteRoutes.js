const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

router.get('/datos', async (req, res) => {
    try {
        const { periodo } = req.query; // Recibe el parámetro desde el frontend
        const hoy = new Date();
        let inicioFiltro = new Date();

        // Lógica de filtrado de fechas
        if (periodo === 'semanal') inicioFiltro.setDate(hoy.getDate() - 7);
        else if (periodo === 'mensual') inicioFiltro.setMonth(hoy.getMonth() - 1);
        else if (periodo === 'anual') inicioFiltro.setFullYear(hoy.getFullYear() - 1);
        else inicioFiltro.setHours(0, 0, 0, 0); // Diario: desde las 00:00 de hoy

        // 1. Total vendido según el periodo
        const ventas = await Venta.aggregate([
            { $match: { fecha: { $gte: inicioFiltro } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        // 2. Vencimientos próximos (30 días a partir de hoy)
        const hoyVencimiento = new Date();
        const limiteVencimiento = new Date();
        limiteVencimiento.setDate(hoyVencimiento.getDate() + 30);

        const porVencer = await Producto.find({ 
            fechaVencimiento: { $gte: hoyVencimiento, $lte: limiteVencimiento } 
        });

        // 3. Stock agrupado por categoría
        const stockPorCategoria = await Producto.aggregate([
            { $group: { 
                _id: "$categoria", 
                productos: { $push: { nombre: "$nombre", stock: "$stock" } } 
            }}
        ]);

        res.json({
            totalVendido: ventas[0]?.total || 0,
            productosPorVencer: porVencer,
            stockPorCategoria: stockPorCategoria
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;