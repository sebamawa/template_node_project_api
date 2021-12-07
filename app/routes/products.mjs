import express from "express";
const router = express.Router();
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.mjs";

router.get("/", getProducts);

router.get('/:id', getProduct);

router.post('/:id', createProduct);

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export { router };