require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// 1. Conectamos a la base de datos
connectDB();

// 2. Configuraciones (Middlewares) - ¡Siempre van antes que las rutas!
app.use(cors());
app.use(express.json()); // Permite leer los datos que mandemos en JSON

// 3. Rutas de nuestra API
app.get('/', (req, res) => res.send('Servidor del Kiosco funcionando 🚀'));
app.use('/api/productos', require('./routes/productoRoutes'));

// 4. Encender el servidor (¡Siempre al final de todo!)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));