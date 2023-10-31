const setError = require("../../helpers/handle-error");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { getSendEmail, setSendEmail } = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const User = require("../models/User.model");
const nodemailer = require("nodemailer")

const registerLargo = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
        await User.syncIndexes();
        let confirmationCode = randomCode();//? generamos el código de confirmación
        const {name, email} = req.body;
        console.log(confirmationCode + " --> CONFRIMATION CODE")

        const userExist = await User.findOne( //? estamos buscando si ya hay un usuario con este email o con este nombre para que si ya existe yo no pueda registrarlo. el findOne te encuentra un solo elemento, el find te da un array con todas las coincidencias con la condición que tu le des
            {email: req.body.email}, //? las condiciones que tiene que cumplir el supuesto usuario si ya existe
            {name: req.body.name}
        );
        if (!userExist) { //? si el usuario no existe: 
            const newUser = new User ({...req.body, confirmationCode}); //? ---- creamos una copia con la info que nos mandan y con el confirmation code que nos da el model de user
            req.file //? ------------------------------------------------------- si hay imagen, pues la actualizamos por la que dan, si no, la default será el url
                ? newUser.image = req.file.path
                : newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png"

            try { //? -------------- como vamos a poner otro await, hay que poner otro try catch para que se pillen bien los errores. por cada asincronía, tiene que haber un trycatch
                const savedUser = await newUser.save() //? --- guardamos el User con la info que nos ha dado en el register

                if (savedUser) { //? si se ha guardado correctamente el Usuario con la info: // no ponemos else porque si no se guarda, va a pillar el error en el catch del save
                    const emailEnv = process.env.EMAIL; //? email del .env
                    const password = process.env.PASSWORD; //? no es la password como tal, sino el código que nos mandan para usar el nodemailer

                    const transporter = nodemailer.createTransport({ //? esto es un metodo que hace el envío del email. la estructura nos la da nodemailer, no la he ideado yo
                        service: "gmail",
                        auth: {
                            user: emailEnv,
                            pass: password
                        }
                    });

                    const mailOptions = { //? igual que el transporter, no lo escribo yo
                        from: emailEnv,
                        to: email,
                        subject: "Confirmation Code",
                        text: `tu código es ${confirmationCode}, gracias por confiar en nosotros ${name}` //? el confirmation code viene del modelo de user y el name del destructuring de la linea 9
                    }

                    transporter.sendMail(mailOptions, function (error, info) { //? método de nodemailer para enviar el mail con la info que le digamos, en este caso transporter con las opciones atribuidas
                        if (error) { //? ----------------------------------------- si ha habido algún error
                            console.log(error)
                            return res.status(404).json({user: userSave, confirmationCode: "error, resend Code"}) //? si ha habido un error le decimos que lo vuelva a enviar
                        } else {
                            console.log("Email sent: " + info.response) //? ------------------- la info nos da la respuesta del envío, si se ha hecho bien
                            return res.status(200).json({user: savedUser, confirmationCode}) //? en este caso le decimos que se ha guardado el usuario y que el confirmationcode se ha enviado correctamente
                        }
                    })
                }
            } catch (error) {
                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({message: "error en el catch del save", error: error.message})
            }

        } else { //? si el usuario ya existe: 
            if (req.file) deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(409).json("this user already exists!")
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error en el catch",
             error: error.message
            }) && next(error)
    }
}

//! ------------------------- REGISTER CON EL ESTADO (traemos la funcion sendEmail que hace el envío) -------------------------------------------

const registerEstado = async (req, res) => {
    let catchImg = req.file?.path;
    try {
        await User.syncIndexes(); //? sabemos si ha cambiado algo del modelo
        let confirmationCode = randomCode();//? generamos el código de confirmación
        const {name, email} = req.body;
        console.log(confirmationCode + " --> CONFRIMATION CODE")

        const userExist = await User.findOne( //? estamos buscando si ya hay un usuario con este email o con este nombre para que si ya existe yo no pueda registrarlo. el findOne te encuentra un solo elemento, el find te da un array con todas las coincidencias con la condición que tu le des
            {email: req.body.email}, //? las condiciones que tiene que cumplir el supuesto usuario si ya existe
            {name: req.body.name}
        )
        if(!userExist) {
            const newUser = new User ({...req.body, confirmationCode}); //? ---- creamos una copia con la info que nos mandan y con el confirmation code que nos da el model de user
            req.file //? ------------------------------------------------------- si hay imagen, pues la actualizamos por la que dan, si no, la default será el url
                ? newUser.image = req.file.path
                : newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png"

            try {
                const savedUser = await newUser.save() //? --------------------- guardamos el user con la info ya metida (linea 91)
                if (savedUser) {
                    sendEmail(email, name, confirmationCode) //? enviamos el correo con la función que se encuentra en utils (sendEmail)

                    setTimeout( () => { //? ponemos un timeout para gestionar la asincronía, ya que si no, nos detecta que no lo ha recibido pero si lo ha hecho, aunque mas tarde porque lo hace una librería externa
                        if (getSendEmail()) { //? ------------------ si se ha enviado el correo
                            setSendEmail(false) //? cada vez que se utiliza la función se tiene que resetear a false
                            res.status(200).json({user: savedUser, confirmationCode}) //? --- exito
                        } else { //? ------------------------------- si no se ha enviado
                            setSendEmail(false)
                            return res.status(404).json({user: userSave, confirmationCode: "error, resend Code"})
                        }
                    }, 1400) //? ----------- el timeout es de 1,4 segundos
                }

            } catch (error) {
                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({message: "error en el catch del save", error: error.message})
            }

        } else {
            if (req.file) deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(409).json("this user already exists!")
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error en el catch",
             error: error.message
            }) && next(error)
    }
}

//! ------------------------- REGISTER DEL REDIRECT -------------------------------------------
//? explicacion a las 12.18

const registerWithRedirect = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
        await User.syncIndexes(); //? sabemos si ha cambiado algo del modelo
        let confirmationCode = randomCode();//? generamos el código de confirmación
        console.log(confirmationCode + " --> CONFRIMATION CODE")

        const userExist = await User.findOne( //? estamos buscando si ya hay un usuario con este email o con este nombre para que si ya existe yo no pueda registrarlo. el findOne te encuentra un solo elemento, el find te da un array con todas las coincidencias con la condición que tu le des
            { email: req.body.email }, //? las condiciones que tiene que cumplir el supuesto usuario si ya existe
            { name: req.body.name }
        )
        if(!userExist) {
            const newUser = new User ({...req.body, confirmationCode}); //? ---- creamos una copia con la info que nos mandan y con el confirmation code que nos da el model de user
            req.file //? ------------------------------------------------------- si hay imagen, pues la actualizamos por la que dan, si no, la default será el url
                ? newUser.image = req.file.path
                : newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png"

            try {
                const savedUser = await newUser.save() //? --------------------- guardamos el user con la info ya metida (linea 91)
                if (savedUser) {
                    return res.redirect(307, `http://localhost:8080/api/v1/users/register/sendMail/${savedUser._id}`) //? lo que estamos diciendo es que rediriga a esta página que te manda un mail, es una pagina que tiene de endpoint el id del usuario en el que hemos metido la info del register
                }

            } catch (error) {
                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({message: "error en el catch del save", error: error.message})
            }

        } else {
            if (req.file) deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(409).json("this user already exists!")
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error en el catch h",
             error: error.message
            }) && next(error)
    }
}

//! ------------------------- SEND CODE -------------------------------------------
const sendCode = async (req, res) => {
    try {
        const {id} = req.params; //? buscamos al user por id en el url porque cuando hacemos el redirect, en el url ya sale el id del usuario
        const userDB = await User.findById(id); //? aqui encontramos al user a través del id de la linea anterior y lo guardamos en variable para poder utilizarlo
        //! --- a partir de aqui ya es como el sendEmail, lo que hemos hecho es obtener el user en la variable userDB para poder mandarle el email. cambian solo un par de cosas que diré

        const email = process.env.EMAIL; //? --------------- nos traemos las variablees de entorno para poder logarnos en gmail
        const password = process.env.PASSWORD;

        const transporter = nodemailer.createTransport({ //? creamos el transporter: se encarga de hacer el envío del correo, es como el cartero que reparte las cartas
            service: 'gmail',
            auth: {
            user: email,
            pass: password,
            },
        });

        const mailOptions = { //? -------------------------- seteamos las opciones del email que se envía
            from: email,
            to: userDB.email,
            subject: 'Confirmation code',
            text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
        };

        transporter.sendMail(mailOptions, function (error, info) { //? ejecutamos el transporter con sendMail y hacemos el envío
            if (error) {
            console.log(error);
            return res.status(404).json({user: userDB, confirmationCode: "error, resent code"}) //? no se ha podido enviar el codigo y lo mostramos
            } else {
            console.log('Email send: ' + info.response);
            return res.status(200).json({user: userDB, confirmationCode: userDB.confirmationCode}) //? si se ha podido enviar y mostramos el exito y el código por aquí
            }
        })
    } catch (error) {
        return res.status(404).json({
            message: "error en el catch",
            error: error.message
        }) && next(error)
    }
}


//! ----------------------- LOGIN ---------------------------------
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body; //? - cogemos el email y la contraseña que nos mete el usuario en el login
        const userDB = await User.findOne({email}) //? buscamos si hay algun usuario registrado con ese email
        if (userDB) {
            if (bcrypt.compareSync(password, userDB.password)) { //? comparamos la contraseña de texto plano (mete el user) con la encriptada que hay en el backend (de cuando el user se registró)
                const token = generateToken(userDB._id, email); //? creamos un token que nos diga que la comprobación ha sido exitosa y que permita al user acceder
                return res.status(200).json({user: userDB, token}) //? le damos el token al user para que sea suyo
            } else {
                return res.status(404).json("password is incorrect (do not match)")
            }
        } else {
            return res.status(404).json("user not registered")
        }
    } catch (error) {
        return next(error)
    }
} 


//! ----------------------- AUTOLOGIN ---------------------------------
  const autologin = async (req, res, next) => {
    try {
        const {email, password} = req.body; //? - cogemos el email y la contraseña que nos mete el usuario en el login
        const userDB = await User.findOne({email}) //? buscamos si hay algun usuario registrado con ese email
        if (userDB) {
            if (pasword === userDB.password) { //? cogemos la contraseña que nos ha dado el backend dp de ponerla el usuario (como nos la da el backend, ya esta encriptada)
                                               //? y NOSOTROS la metemos en el body al hacer el autologin, por lo tanto el body es email + contraseña encriptada y las comparamos. en el login se compara la de texto plano con la encriptada
                const token = generateToken(userDb._id, email);
                return res.status(200).json({user: userDB, token}) //? le damos el token al user para que sea suyo
            } else {
                return res.status(404).json("password is incorrect (do not match)")
            }
        } else {
            return res.status(404).json("user not registered")
        }
    } catch (error) {
        return next(error)
    }
} 
//! ------------------------- RESEND CODE ---------------------------------
const resendCode = async (req, res, next) => {
    try {
        const email = process.env.EMAIL
        const password = process.env.PASSWORD
        const transporter = nodemailer.createTransport({ //? creamos el transporter: se encarga de hacer el envío del correo, es como el cartero que reparte las cartas
            service: 'gmail',
            auth: {
            user: email,
            pass: password,
            },
        });

        const userExist = User.findOne({email: req.body.email});
        if (userExist) {
            const mailOptions = { //? -------------------------- seteamos las opciones del email que se envía
                from: email,
                to: req.body.email,
                subject: 'Confirmation code',
                text: `tu codigo es ${userExist.confirmationCode}, gracias por confiar en nosotros ${userExist.name}`,
            };

            transporter.sendMail(mailOptions, function (error, info) { //? ejecutamos el transporter con sendMail y hacemos el envío
                if (error) {
                console.log(error);
                return res.status(404).json({resend: false}) //? no se ha podido enviar el codigo y lo mostramos
                } else {
                console.log('Email send: ' + info.response);
                return res.status(200).json({resend: true, confirmationCode}) //? si se ha podido enviar y mostramos el exito y el código por aquí
                }
            })
        } else {
            return res.status(404).json("User not found")
        }
    } catch (error) {
        return next(setError(500, (error.message || "Error general to ResendCode")))
    }
}

//! ------------------------- CHECK NEW USER ----------------------
const checkNewUser = async (req, re, next) => {
    try {
        const {email, confirmationCode} = req.body;
        const userExist = await User.findOne({email}) //? encontramos al user con el email
        if (userExist) {
            if (userExist.confirmationCode === confirmationCode) { //? si el confirmation code del back coindice con el que recibimos en el body
                try {
                    await userExist.updateOne({ check: true }); //? le digo la propiedad que quiero cambiar. solo me cambia esto
                    const updateUser = await User.findOne({email}); //? buscamos el usuario actualizado y devolvemos un test:
                    return res.status(200).json({testCheckUser: updateUser.check == true ? true : false}) //? 
                } catch (error) {
                    
                }
            } else {
                await User.findByIdAndDelete(userExist._id); //? si no tienes el confirmation code correcto, es que no deberias estar en mi backend y por lo tanto, te busco por id y te borro
                deleteImgCloudinary(userExist.image) //? borramos la imagen
                return res.status(404).json({ //? lanzamos un 404 con el user que antes existia, el check en false y un test de si se ha borrado correctamente
                    userExist,
                    check: false,
                    // delete: await 
                })
            }
        } else {
            return res.status(404).json("User not found")
        }
    } catch (error) {
        
    }
}

//! ----------------------- CAMBIO CONTRASEÑA ---------------------------------
const changePassword = async (req, res, next) => {
    try {
        const {email} = req.body
        const userDB = await User.findOne({email})
        if (userDB) { //? si encontramos el usuario en el backend:
            return res.redirect(307, `http://localhost:8080/api/v1/users/sendPassword/${userDB._id}`)
        } else {
            return res.status(404).json("User is not registered")
        }
    } catch (error) {
        return next(setError(500 || "Error general to changePassword NO AUTH"))
    }
    
}


//! --------------------- ENVÍO DE CONTRASEÑA ------------------------------
const sendPassword = async (req, res, next) => {
    try {
        const {email} = req.body
        const userDB = await User.findOne({email})
        // const passwordSecure 
    } catch (error) {
        
    }
}



//! ------------------------- AUTH MIDDLEWARE -------------------------------------------
//? explicación a las 12.53

module.exports = {
    registerLargo,
    registerEstado,
    registerWithRedirect,
    sendCode,
    login,
    autologin
};