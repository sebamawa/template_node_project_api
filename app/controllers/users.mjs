import { httpError } from '../helpers/handleError.mjs';
import userModel from '../models/users.mjs';

const getUsers = (req, res) => {
    res.send('lista de USUARIOS cargados');
}

const getUser = async (req, res) => {}

const createUser = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;
        const resDetail = await userModel.create({
            name, email, password
        })
        res.send({ data: resDetail});
    } catch(e) {
        httpError(res, e);
    }
}


const updateUser = async (req, res) => {}

const deleteUser = async (req, res) => {}

export {getUsers, getUser, createUser, updateUser, deleteUser} 