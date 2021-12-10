import { httpError } from '../helpers/handleError.mjs';
import userModel from '../models/users.mjs';

const getUsers = async (req, res) => {
    try {
        const listAll = await userModel.find({});
        res.json(listAll);
    } catch(e) {
        httpError(res, e);
    }
}

const getUser = async (req, res) => {}

const createUser = async (req, res) => {
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

export { getUsers, getUser, createUser, updateUser, deleteUser } 