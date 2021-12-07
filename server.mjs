
// const express = require('express');
import express from 'express';
// const session = require('express-session');
import session from 'express-session';
// const MongoStore = require('connect-mongo')(session);
// const MongoStore = require('connect-mongo');
import MongoStore from 'connect-mongo';

import { addTwo } from './functions.mjs';

// url a la base de datos
const MONGO_URL = 'mongodb://localhost:27017/sessions';
const app = express();

// middleware - seteo de la sesion
app.use(session({ 
  secret: 'keyboard cat', // para encriptar ids enviados al cliente
  resave: true, // 
  // cookie: { maxAge: 600000 }, // tiempo de vida de la sesion
  saveUninitialized: true,
  // store: MongoStore.create({ // session usa mongodb como store de las sesiones
  //    mongoUrl: process.env.MONGO_URL || MONGO_URL,
  // }) 
}));

// rutas
app.get('/', (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1; // cuenta el numero de visitas del usuario
  res.send(`Has visitado esta página ${req.session.count} veces`);
});

app.listen(3000, () => {
  console.log(addTwo(2));
  console.log('Server running on port 3000');
});