//** Inicializacion del servidor */

import app from './src/app.mjs';
import dbConnect from './config/mongo.mjs';

dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});