import mongoose from 'mongoose';

// El esquema le dice a Mongo la estructura de datos que va a tener el modelo
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    }
},
    { 
        timestamps: true,
        versionKey: false    
    });

export default mongoose.model('users', UserSchema); // users es el nombre de la coleccion en la base de datos