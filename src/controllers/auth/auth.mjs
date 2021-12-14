import { httpError } from '../../helpers/auxiliaryFunctions.mjs';
import UserModel from '../../models/users.mjs';
import jwt from 'jsonwebtoken';

const signupUser = async (req, res) => {
    const SECRET_KEY_JWS = process.env.SECRET_KEY_JWS;
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.send({ error: 'ya existe un usuario con ese email' });
        } else {
            const { username, name, email, password } = req.body;
            const newUser = await UserModel.create({
                username, name, email, password
            });

            // const newUser = await userModel.save();
            const dataUser = {
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            }

            // genero json web token
            const token = await jwt.sign(
                dataUser, 
                SECRET_KEY_JWS, 
                {expiresIn: 60 * 60 * 24 // 1 dia
            })

            res.json({"userCreated": dataUser, "token": token});

            // res.send({ data: newUser });
        }
    } catch(error) {
        httpError(res, error);
    }
}

const loginUser = async(req, res) => {
    const SECRET_KEY_JWS = process.env.SECRET_KEY_JWS;
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }); 

        if (!user) { // user puede ser null si no se encuentra el documento
            res.status(404).send({ error: 'no se encontro ese usuario' });
        } else {
            // verifico password
            const matchPasswords = await user.comparePassword(password, user.password);
            if (matchPasswords === true) {
                console.log('login exitoso');

                // genero json web token
                const token = await jwt.sign({ user }, SECRET_KEY_JWS, {
                expiresIn: 60 * 60 * 24})
            }        
            res.json({"token": token})
        }
    } catch(error) {
        httpError(res, error);
    }
}

const profileUser = async(req, res) => {
    const SECRET_KEY_JWS = process.env.SECRET_KEY_JWS;
    try {
        /*
        // console.log(req.headers);
        const token = req.headers['authorization']; //.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                auth: false,
                error: 'No se ha proporcionado el token'
            });
        }

        // TODO: verificacion del token se hace en un middleware y se usa en todo ruta que tenga que verificarlo
        // obtengo datos del usuario (del payload del token) 
        const user = jwt.verify(token, SECRET_KEY_JWS);
        */

        console.log(req.user);
        const email = req.user.email;
        // busco el usuario en la base de datos por email
        const userData = await UserModel.findOne({ email }, {_id: 0, password: 0, createdAt: 0, updatedAt: 0});
        if (userData) {
            res.json({
                auth: true,
                userData: userData
            });
        } else {
            res.status(404).json({
                auth: false,
                error: 'No se encontro el usuario'
            });
        }
    } catch(error) {
        httpError(res, error);
    }
}

export { loginUser, signupUser, profileUser } 