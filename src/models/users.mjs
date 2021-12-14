import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// El esquema le dice a Mongo la estructura de datos que va a tener el modelo
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        // select: false
    }
}, 
    { 
        timestamps: true, // agrega los campos createdAt y updatedAt
        versionKey: false  
    });

// encripta contraseña
async function encryptPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log('Error al generar el salt o el password');
        throw new Error(error);
    }       
}

// encripta la contraseña antes de guardarla en la base de datos    
UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash = await encryptPassword(user.password);
        user.password = hash;
        next();
    } catch (error) {
        console.log('Error al generar el salt o el password');
        next(error);
    } 
}) 

UserSchema.methods.comparePassword = async function(candidatePassword, hashedPassword) {
    try {
        // const hash = await encryptPassword(candidatePassword);
        return await bcrypt.compare(candidatePassword, hashedPassword); // devuelve promesa
    } catch (error) {
        console.log("Error al comparar el password");
    }
};

// exportar el modelo
export default mongoose.model('users', UserSchema); // users es el nombre de la coleccion en la base de datos