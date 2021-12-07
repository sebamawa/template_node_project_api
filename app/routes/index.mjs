import express from 'express';
const router = express.Router();
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// const pathRouter = `${__dirname}`; //
const __dirname = dirname(fileURLToPath(import.meta.url));

// excluye index.js y extensiones de los archivos de rutas
const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

const loadModule = async (path) => {
    const module = await import(path);
    return module;
}

// const userRoutesModule = await loadModule('./users.mjs'); // FUNCIONA
// console.log('modulo cargado ...');
// router.use('/users', userRoutesModule.router);

// a partir de los archivos creados en app/routes se crean las rutas
// ERROR: forEach no espera por await
// fs.readdirSync(__dirname).forEach(async (file) => {
//     const fileWithOutExtension = removeExtension(file);
//     const skip = ['index'].includes(fileWithOutExtension);
//     if (!skip) {
//         const usersRoutesModule = await loadModule('./users.mjs'); // FUNCIONA
//         console.log('modulo cargado ...');
//         router.use('/users', usersRoutesModule.router);
//     }
// });

// https://stackoverflow.com/questions/54569588/array-data-gets-lost-in-nested-async-arrow-function-loop
const filesNames = fs.readdirSync(__dirname);
for (let file of filesNames) {
    const fileWithOutExtension = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExtension);
    if (!skip) {
        const usersRoutesModule = await loadModule(`${__dirname}/${file}`); // FUNCIONA
        // console.log(`modulo cargado ... ${fileWithOutExtension}`);
        router.use(`/${fileWithOutExtension}`, usersRoutesModule.router);
    }
}

router.get('*', (req, res) => {
    res.status(404);
    res.send({error: 'Not found'});
});

export default router;