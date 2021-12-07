import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './app/routes/index.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

import dbConnect from './config/mongo.mjs';

//app.use(cors());

app.use(express.json());
app.use('/api', router);

dbConnect();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});