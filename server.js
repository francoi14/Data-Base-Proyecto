const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB 
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kioscoDB')
    .then(() => console.log('Servidor conectado a MongoDB'))
    .catch((err) => console.log('Error de conexión:', err));

// Rutas
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/ventas', require('./routes/ventaRoutes'));
app.use('/api/reportes', require('./routes/reporteRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));

// Puerto
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});