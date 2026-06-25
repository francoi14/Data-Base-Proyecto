const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

router.get('/datos', async (req, res) => {
    try {
        const { periodo } = req.query;
        const hoy = new Date();
        let inicioFiltro = new Date();

        // Lógica de filtrado
        if (periodo === 'semanal') inicioFiltro.setDate(hoy.getDate() - 7);
        else if (periodo === 'mensual') inicioFiltro.setMonth(hoy.getMonth() - 1);
        else if (periodo === 'anual') inicioFiltro.setFullYear(hoy.getFullYear() - 1);
        else inicioFiltro.setHours(0, 0, 0, 0);

        // 1. Total vendido
        const ventas = await Venta.aggregate([
            { $match: { fecha: { $gte: inicioFiltro } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        // 2. Obtener detalles de ventas y productos para los nombres
        const ventasDetalle = await Venta.find({ fecha: { $gte: inicioFiltro } });
        const productosAll = await Producto.find({});
        
        const prodMap = {};
        productosAll.forEach(p => { prodMap[p._id.toString()] = p.nombre; });

        const resumenVentas = {};
        ventasDetalle.forEach(v => {
            // ACÁ ESTÁ LA SOLUCIÓN: Cambiamos v.productoId por v.producto
            const id = v.producto ? v.producto.toString() : 'desconocido';
            const nombre = prodMap[id] || 'Producto Eliminado';
            
            if (!resumenVentas[nombre]) {
                resumenVentas[nombre] = { nombre, cantidad: 0, total: 0 };
            }
            resumenVentas[nombre].cantidad += v.cantidad || 0;
            resumenVentas[nombre].total += v.total || 0;
        });

        // 3. Vencimientos
        const hoyVencimiento = new Date();
        const limiteVencimiento = new Date();
        limiteVencimiento.setDate(hoyVencimiento.getDate() + 30);
        const porVencer = await Producto.find({ 
            fechaVencimiento: { $gte: hoyVencimiento, $lte: limiteVencimiento } 
        });

        // 4. Stock agrupado
        const stockPorCategoria = await Producto.aggregate([
            { $group: { 
                _id: "$categoria", 
                productos: { $push: { nombre: "$nombre", stock: "$stock" } } 
            }}
        ]);

        res.json({
            totalVendido: ventas[0]?.total || 0,
            productosPorVencer: porVencer,
            stockPorCategoria: stockPorCategoria,
            articulosVendidos: Object.values(resumenVentas)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;