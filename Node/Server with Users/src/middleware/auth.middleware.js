//! Este middleware comprueba que la persona está autorizada a entrar a las rutas.
//! Lo hace a través de un token, que genera la libreria JWT

const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

//! Comprueba si estás autenticado para acceder
const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", ""); //? estamos quitando el bearer para que quede solo el token
    if (!token) next(new Error("Unauthorized")); //? si no hay token no estás autorizado, se manda el error // aunque no lo pongamos, al poner el error en el next, te echa del backend

    try {
        const decodedToken = verifyToken(token, process.env.JWT_SECRET) //? la secret es la contraseña para desencriptar el token
        console.log(decodedToken) //? decodedToken = {id, email}

        //! --> comprobamos que esta autenticado
        req.user = await User.findById(decodedToken.id) //? estamos creando el req.user, que vendría a ser como una propiedad de req con el user obtenido. nos confirma que esta autenticado
    } catch (error) {
        return next(error)
    }
}

const isAuthAdmin = async (req, res, next) => { //? es igual al anterior, pero te pide que seas administrador
    const token = req.headers.authorization?.replace('Bearer ', '');
  
    if (!token) {
      return next(new Error('Unauthorized'));
    }
  
    try {
      const decoded = verifyToken(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (req.user.rol !== 'admin') { //? si tu rol es diferente a administrador, te voy a echar
        return next(new Error('Unauthorized, not admin'));
      }
      next(); //? si eres admin, continua
    } catch (error) {
      return next(error);
    }
  };

module.exports = {
    isAuth, 
}
