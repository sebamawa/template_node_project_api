import express from "express";
const router = express.Router();
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.mjs";

router.get("/", getUsers);

// router.get("/", (req, res) => {
//     res.send('lista de usuarios');
// });

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export { router };