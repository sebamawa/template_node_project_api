// funcion a inyectar en rutas 
const checkOrigin = (req, res, next) => {
    console.log(req.headers);
    next();
}

export default checkOrigin;