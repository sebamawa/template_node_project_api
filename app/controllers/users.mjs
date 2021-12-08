import { httpError } from '../helpers/handleError.mjs';
import userModel from '../models/users.mjs';

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        userModel.findOne({ email }, async (err, user) => {
           if (err) {
               console.log(err);
               res.send({ error: "Error al buscar el usuario" });
           }
           if (!user) { // user puede ser null si no se encuentra el documento
               res.send({ error: 'credenciales incorrectas' });
           } else {
                // verifico password
                const match = await user.comparePassword(password, user.password);
                console.log(match);
                if (match === true) {
                    console.log('login exitoso');
                    res.send({ data: user });
                } else {
                    res.send({ error: 'credenciales incorrectas' });
                } 
           }
        }) 
    } catch(error) {
        console.log(`Error login: ${e}`);
        res.send({ error: 'credenciales incorrectas' });
    }
}

const getUsers = async (req, res) => {
    try {
        const listAll = await userModel.find({});
        res.send({ data: listAll});
    } catch(e) {
        httpError(res, e);
    }
}

const getUser = async (req, res) => {}

const createUser = async (req, res) => {
    console.log(req.body);
    try {
        const { username, name, email, password } = req.body;
        const resDetail = await userModel.create({
            username, name, email, password
        })
        res.send({ data: resDetail});
    } catch(e) {
        httpError(res, e);
    }
}


const updateUser = async (req, res) => {}

const deleteUser = async (req, res) => {}

export {loginUser, getUsers, getUser, createUser, updateUser, deleteUser} 