import { httpError } from '../../helpers/handleError.mjs';
import userModel from '../../models/users.mjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY_JWS = process.env.SECRET_KEY_JWS;

const signupUser = async(req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            res.send({ error: 'el usuario ya existe' });
        } else {
            const newUser = new userModel({ name, username, email, password });
            await newUser.save();
            // genero json web token
            const token = await jwt.sign({ user: newUser }, SECRET_KEY_JWS, {
                expiresIn: 60 * 60 * 24 // 1 dia
            })

            res.json({token})

            // res.send({ data: newUser });
        }
    } catch(error) {
        httpError(res, error);
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });    

        if (!user) { // user puede ser null si no se encuentra el documento
            res.send({ error: 'no se encontro ese usuario' });
        } else {
            // verifico password
            const matchPasswords = await user.comparePassword(password, user.password);
            if (matchPasswords === true) {
                console.log('login exitoso');
                res.send({ data: user });
            } else {
                res.send({ error: 'contraseña incorrecta' });
            } 
        }
    } catch(error) {
        httpError(res, error);
    }
}

const profileUser = async(req, res) => {
    try {
        // console.log(req.headers);
        const token = req.headers['authorization']; //.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                error: 'no hay token'
            });
        }
        const { user } = jwt.verify(token, SECRET_KEY_JWS);
        res.json({
            auth: true,
            data: user
        });
    } catch(error) {
        httpError(res, error);
    }
}

export { loginUser, signupUser, profileUser } 