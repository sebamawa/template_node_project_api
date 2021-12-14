import jwt from 'jsonwebtoken';

const httpError = (res, err) => {
    console.log(err);
    res.status(500);
    res.send({ error: 'Algo salio mal' });
}

const verifyJWSToken = async (req, res, next) => {
    const SECRET_KEY_JWS = process.env.SECRET_KEY_JWS;
    try {
        const token = req.headers['authorization']; //.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                auth: false,
                error: 'No se ha proporcionado el token'
            });
        }
        const user = await jwt.verify(token, SECRET_KEY_JWS); 
        req.user = user;
        next();      
    } catch(error) {
        res.status(500).json({error: "No se pudo verificar el token"});
    }
}

export { httpError, verifyJWSToken };