require('dotenv').config()
const mongoose = require("mongoose");

const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    try {
        const connection = await mongoose.connect(DB_URI);
        console.log('💓  ****** CONEXIÓN  CORRECTA ****** 💓 ');
        return connection.connection.getClient();
    }
    catch (error) {
        console.log('🤡  ****** LA CONEXIÓN A FALLADO ****** 🤡', error);
        throw error;
    }
};

module.exports = dbConnect;