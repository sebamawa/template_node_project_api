// conexion a base de datos
import mongoose from 'mongoose';

const dbConnect = () => {
    console.log('Conectando a la base de datos...');
    const DB_URI = process.env.DB_URI;

    mongoose.connect('mongodb://127.0.0.1:27017/sessions',
         { useNewUrlParser: true, 
           useUnifiedTopology: true 
    }, (err, res) => {
        if (!err) {
            console.log('DB Connected');
        } else {
            console.log(`DB Connection Error; ${err}`); 
        }
    });
}

export default dbConnect;