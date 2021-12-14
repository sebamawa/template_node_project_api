import { httpError } from '../helpers/auxiliaryFunctions.mjs';
import UserModel from '../models/users.mjs';

const getUsers = async (req, res) => {
    try {
        const listAll = await userModel.find({}, {createdAt: 0, updatedAt: 0});
        res.json(listAll);
    } catch(e) {
        httpError(res, e);
    }
}

const getUser = async (req, res) => {}

const createUser = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const userCreated = await UserModel.create({
            username, name, email, password
        });
        res.json({userCreated: {name: userCreated.name, username: userCreated.username, email: userCreated.email}});
    } catch(e) {
        res.json({error: "No se pudo crear el usuario"});
        httpError(res, e);
    }
}


const updateUser = async (req, res) => {}

const deleteUser = async (req, res) => {}

export { getUsers, getUser, createUser, updateUser, deleteUser } 