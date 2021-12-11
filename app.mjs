import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './app/routes/index.mjs';

// swagger
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
// https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
import { createRequire } from "module"; // para cargar json con es6 modules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

import dbConnect from './config/mongo.mjs';

app.use(cors());

app.use(express.json());
app.use('/api', router);
// Setting up swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// usando router
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

dbConnect();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});