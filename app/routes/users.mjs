import express from "express";
const router = express.Router();
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.mjs";
// middleware
import checkOrigin from '../middleware/origin.mjs';

router.get("/", getUsers);

// router.get("/", (req, res) => {
//     res.send('lista de usuarios');
// });

router.get('/:id', getUser);

router.post('/', createUser, checkOrigin);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export { router };