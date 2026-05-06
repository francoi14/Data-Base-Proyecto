require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Conectamos a la base de datos[cite: 1]
connectDB();

// Configuraciones (Middlewares)[cite: 1]
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba para verificar que el servidor responda
app.get('/', (req, res) => res.send('Servidor del Kiosco funcionando 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

// Middleware para leer JSON
app.use(express.json());

// Usar las rutas de productos
app.use('/api/productos', require('./routes/productoRoutes'));