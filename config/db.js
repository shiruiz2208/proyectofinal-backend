import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.log('Hubo un error');
        process.exit(1);
    }
};

export default conectarDB;