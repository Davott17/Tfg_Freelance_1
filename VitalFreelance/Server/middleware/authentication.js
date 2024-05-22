const moment = require("moment");
const jwt = require("../services/jwt").default;
const { json } = require("stream/consumers");

const SECRET_KEY =  "ajdsdfuqkk39234sdfs742323499sdfhssdfss";

function ensureAuth(req, res, next) {

if(!req.headers.authorization){
    return res
    .status(403)
    .send({ msg: 'La peticion no tien la cabecera de autenticación' });
}
const  token = req.headers.authorization.replace(/['"]+/g, '') ; //elimina las comillas dobles que podrian  estar alrededor del token

const payload = jwt.decodeToken(token, SECRET_KEY);//devuelve un objeto con el contenido del token o null si es invalido
try{
    if(payload.exp <=  moment().unix() ) {
        return res.status(400).json({msg:'El token ha expirado'});
    }
}catch(error){
    return res.status(400).send({msg: "token invalido"});
    
}
    req.user = payload;
    next();
}

module.exports =  {
    ensureAuth,
};