const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // ConexiOn a MongoDB usando la URI del archivo .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Conectado: El kiosco está online');
    } catch (err) {
        console.error('❌ Error de conexión:', err.message);
        process.exit(1); // Cierra el proceso si falla la conexiOn
    }
};

module.exports = connectDB;