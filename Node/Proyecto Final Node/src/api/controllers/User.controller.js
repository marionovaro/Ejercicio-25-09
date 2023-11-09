//! -------- MIDDLEWARE ----------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//! -------- UTILS -----------
const { generateToken } = require("../../utils/token");
const sendEmail = require("../../utils/sendEmail")
const randomCode = require("../../utils/randomCode");
const randomPassword = require("../../utils/randomPassword");
const { enumGenderOk } = require("../../utils/enumOk");

//! -------- ESTADOS ----------
const { getSendEmail, setSendEmail } = require("../../state/state.data");

//! -------- LIBRERIAS ----------
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt")
const validator = require("validator");

//! --------- HELPERS --------
const setError = require("../../helpers/handle-error");

//! --------- MODELOS --------
const Player = require("../models/Player.model");
const Team = require("../models/Team.model");
const User = require("../models/User.model");
const Eleven = require("../models/Eleven.model");
const Comment = require("../models/Comment.model");


//todo -------------------------------------------------------------------------------------------------------

//! ------------------------ REGISTER LARGO -----------------------------
const registerLargo = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
        await User.syncIndexes();
        let confirmationCode = randomCode();//? generamos el código de confirmación
        const {name, email} = req.body;
        console.log(confirmationCode + " --> CONFRIMATION CODE")

        const userExist = await User.findOne( //? estamos buscando si ya hay un usuario con este email o con este nombre para que si ya existe yo no pueda registrarlo. el findOne te encuentra un solo elemento, el find te da un array con todas las coincidencias con la condición que tu le des
            {email: req.body.email}, //? las condiciones que tiene que cumplir el supuesto usuario si ya existe. que el email sea el que hemos puesto en el body
            {name: req.body.name} //? tambien que el name sea el mismo, tiene que cumplir las dos
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
                            pass: password //? para poder usar este metodo de nodemailer e identificarme como el que lleva el servidor, no tiene que ver con nada del cliente, es verificacion de la aplicación y yo como programador
                        }
                    });

                    const mailOptions = { //? igual que el transporter, no lo escribo yo
                        from: emailEnv, //? lo envío yo con el email que he puesto en el env
                        to: email, //? esto es el destinatario, que sí que se saca del body del register, es decir, se lo enviamos al correo que nos ha dado el ususario al registrarse
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
                return res.status(404).json({message: "no se ha podido guardar la info del register en el nuevo usuario ❌", error: error.message})
            }

        } else { //? si el usuario ya existe: 
            if (req.file) deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(409).json("this user already exists!")
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error al crear nuevo usuario ❌ - catch general",
             error: error.message
            }) && next(error)
    }
}

//! ------ REGISTER CON EL ESTADO (traemos la funcion sendEmail que hace el envío) -------
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
                const savedUser = await newUser.save() //? --------------------- guardamos el user con la info ya metida (6 lineas antes)
                if (savedUser) {
                    sendEmail(email, name, confirmationCode) //? enviamos el correo con la función que se encuentra en utils (sendEmail)

                    setTimeout( () => { //? ponemos un timeout para gestionar la asincronía, ya que si no, nos detecta que no lo ha recibido pero si lo ha hecho, aunque mas tarde. eso es porque lo hace una librería externa (nodemailer)
                        if (getSendEmail()) { //? ------------------ si se ha enviado el correo
                            setSendEmail(false) //? ---------------- cada vez que se utiliza la función se tiene que resetear a false
                            res.status(200).json({user: savedUser, confirmationCode}) //? --- exito
                        } else { //? ------------------------------- si no se ha enviado
                            setSendEmail(false)
                            return res.status(404).json({user: userSave, confirmationCode: "error al enviar el correo de confirmación ❌📩, resend Code"})
                        }
                    }, 1400) //? ----------- el timeout es de 1,4 segundos
                }

            } catch (error) {
                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({message: "error al guardar el usuario ❌", error: error.message})
            }

        } else {
            if (req.file) deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(409).json("this user already exists!")
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error al registrar el nuevo usuario ❌ - catch general",
             error: error.message
            }) && next(error)
    }
}

//! ------------------------- REGISTER with REDIRECT -------------------------------------------
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
                const savedUser = await newUser.save() //? --------------------- guardamos el user con la info ya metida (6 lineas antes)
                if (savedUser) {
                    return res.redirect(307, `http://localhost:8081/api/v1/users/register/sendMail/${savedUser._id}`) //? lo que estamos diciendo es que rediriga a esta página que te manda un mail, es una pagina que tiene de endpoint el id del usuario en el que hemos metido la info del register
                }

            } catch (error) {
                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({message: "error al guardar el usuario ❌", error: error.message})
            }

        } else {
            if (req.file) deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(409).json("this user already exists!")
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error al registrar el nuevo usuario ❌ - catch general",
             error: error.message
            }) && next(error)
    }
}

//! ------------------------- SEND CODE -------------------------------------------
const sendCode = async (req, res) => {
    console.log("yepaa voy!")
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
            to: userDB.email, //! aquí se envía al correo del usuario que se ha registrdo en el register con redirect, podemos acceder porque hemos guardado ese user en la 3a linea de la funcion
            subject: 'Confirmation code',
            text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
        };

        transporter.sendMail(mailOptions, function (error, info) { //? ejecutamos el transporter con sendMail y hacemos el envío
            if (error) {
            console.log(error);
            return res.status(404).json({user: userDB, confirmationCode: "error al enviar el codigo ❌, reenviar código"}) //? no se ha podido enviar el codigo y lo mostramos
            } else {
            console.log('Email send: ' + info.response);
            return res.status(200).json({user: userDB, confirmationCode: userDB.confirmationCode}) //? si se ha podido enviar y mostramos el exito y el código por aquí
            }
        })
    } catch (error) {
        return res.status(404).json({
            message: "error en el sendCode general",
            error: error.message
        }) && next(error)
    }
}

//! ----------------------- GET by ID ------------------------------
const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const userById = await User.findById(id); //? cogemos el elemento (usuario) identificandolo a través del id, que es único
        return res
            .status(userById ? 200 : 404)
            .json(userById ? userById : "no se ha encontrado un usuario con ese id ❌");

    } catch (error) {
        return res.status(404).json({message: "error en el GET by ID ❌ - catch general", error: error.message})
    }
};

//! ----------------------- GET ALL ------------------------------
const getAll = async (req, res, next) =>  {
    try {
        const allUsers = await User.find() //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODOS LOS USERS
        return res 
            .status(allUsers.length > 0 ? 200 : 404) //? ---- si hay equipos en la db (el array tiene al menos 1 elemento), 200 o 404
            .json(allUsers.length > 0 ? allUsers : {message: "No se han encontrado usuarios en la DB ❌", error: error.message}); 

    } catch (error) {
        return res.status(404).json({message: "error al buscar usuarios en la colección ❌ - catch general", error: error.message});
    }
};

//! ----------------------- GET by NAME ------------------------------
const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const userByName = await User.find({name});
        return res
            .status(userByName.length > 0 ? 200 : 404) //? igual que en get all, miramos si el array con ese nombre es mayor que 0 (solo debería de haber 1) y mostramos 200 o 404
            .json(userByName.length > 0 ? userByName : "no se ha encontrado ningún usuario con ese nombre ❌");

    } catch (error) {
        return res.status(404).json({message: "error al buscar a través del name ❌ - catch general", error: error.message});
    }
};

//! ----------------------- LOGIN ------------------------------
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body; //? - cogemos el email y la contraseña que nos mete el usuario en el login
        const userDB = await User.findOne({email}) //? buscamos si hay algun usuario registrado con ese email
        if (userDB) {
            if (bcrypt.compareSync(password, userDB.password)) { //? comparamos la contraseña de texto plano (mete el user) con la encriptada que hay en el backend (de cuando el user se registró)
                const token = generateToken(userDB._id, email); //? creamos un token que nos diga que la comprobación ha sido exitosa y que permita al user acceder
                return res.status(200).json({user: userDB, token}) //? le damos el token al user para que sea suyo
            } else {
                return res.status(404).json("password is incorrect (does not match) ❌")
            }
        } else {
            return res.status(404).json("User not found/is not registered 🔎❌")
        }
    } catch (error) {
        return res.status(404).json({
            message: "error al logearse ❌",
            error: error.message
        }) && next(error)
    }
} 

//! ----------------------- AUTOLOGIN ---------------------------------
  const autologin = async (req, res, next) => {
    try {
        const {email, password} = req.body; //? -  la contraseña en este caso, es la encriptada, ya que la sacamos nosotros del backend, no nos lo da el user
        const userDB = await User.findOne({email}) //? buscamos si hay algun usuario registrado con ese email
        if (userDB) {
            if (password === userDB.password) { //? cogemos la contraseña que nos ha dado el backend dp de ponerla el usuario (como nos la da el backend, ya esta encriptada)
                                               //? y NOSOTROS la metemos en el body al hacer el autologin, por lo tanto el body es email + contraseña encriptada y las comparamos. en el login se compara la de texto plano con la encriptada
                const token = generateToken(userDB._id, email);
                return res.status(200).json({user: userDB, token}) //? le damos el token al user (userDB) para que sea suyo
            } else {
                return res.status(404).json("password is incorrect (does not match) ❌")
            }
        } else {
            return res.status(404).json("User not found/is not registered 🔎❌")
        }
    } catch (error) {
        return res.status(404).json({
            message: "error al logearse automáticamente ❌",
            error: error.message
        }) && next(error)
    }
}

//! ------------------------- RESEND CODE ------------------------------
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

        const userExist = User.findOne({email: req.body.email}); //? comprobamos que el user existe gracias al req.body.email ya que lo checkeamos buscandolo en la DB
        if (userExist) {
            const mailOptions = { //? ------------------------------ seteamos las opciones del email que se envía
                from: email,
                to: req.body.email,
                subject: ' Resent Confirmation code',
                text: `tu codigo es ${userExist.confirmationCode}, gracias por confiar en nosotros ${userExist.name}`,
            };

            transporter.sendMail(mailOptions, function (error, info) { //? ejecutamos el transporter con sendMail y hacemos el envío
                if (error) {
                    console.log(error);
                    return res.status(404).json({resend: false}) //? no se ha podido reenviar el codigo por lo tanto la propiedad resend es false
                } else {
                    console.log('Email send: ' + info.response);
                    return res.status(200).json({resend: true, confirmationCode}) //? si se ha podido enviar y mostramos el exito y el código por aquí
                }
            })
        } else {
            return res.status(404).json("User not found/is not registered")
        }
    } catch (error) {
        return next(setError(500, (error.message || "Error general en el reenvío del código"))) //? llamamos a la función que crea el error con el mensaje que yo le diga
    }
}

//! ------------------------- CHECK NEW USER ------------------------
const checkNewUser = async (req, res, next) => { //? verifica si el correo del register es correcto para poder accer y logearte. se verifica a través del codigo enviado
    try {
        const {email, confirmationCode} = req.body; //? en el body nos viene el email y el codigo de confirmación
        const userExist = await User.findOne({email}) //? encontramos al user con el email
        if (userExist) {
            if (userExist.confirmationCode === confirmationCode) { //? si el confirmation code del back coindice con el que recibimos en el body
                try {
                    await userExist.updateOne({ check: true }); //? le digo la propiedad que quiero cambiar. solo me cambia esto. check a true
                    const updateUser = await User.findOne({email}); //? buscamos el usuario actualizado y devolvemos un test:
                    return res.status(200).json({testCheckUser: updateUser.check == true ? true : false}) //? si el check esta en true es que ha ido bien, si esta en false es que algo ha fallado
                } catch (error) {
                    return res.status(404).json({message: "error al comprobar el check user ❌", error: error.message}) //? mira si se ha actualizado el usuario corectamente 
                }
            } else {
                await User.findByIdAndDelete(userExist._id); //? si no tienes el confirmation code correcto, es que no deberias estar en mi backend y por lo tanto, te busco por id y te borro
                deleteImgCloudinary(userExist.image) //? borramos la imagen
                return res.status(404).json({ //? lanzamos un 404 con el user que antes existia, el check en false y un test de si se ha borrado correctamente
                    userExist,
                    check: false,
                    delete: (await User.findById(userExist._id)) ? "El usuario no se ha podido borrar" : "El usuario se ha borrado correctamente" //? miramos si el user antiguo existe y mostramos el exito/fracaso del borrado
                })
            }
        } else {
            return res.status(404).json("User not found/is not registered 🔎❌")
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general en el checkeo de user con código"))
    }
}

//! ----------------------- CAMBIO CONTRASEÑA ---------------------------------
const changePassword = async (req, res, next) => {
    try {
        const {email} = req.body
        const userDB = await User.findOne({email})
        if (userDB) { //? si encontramos el usuario en el backend:
            return res.redirect(307, `http://localhost:8081/api/v1/users/sendPassword/${userDB._id}`) //? llamamos a un redirect que genera contraseña nueva (lo hace: utils/randomPassword) y la envía
        } else {
            return res.status(404).json("User not found/is not registered 🔎❌")
        }
    } catch (error) {
        return next(setError(500 || "Error general al cambiar la contraseña ❌"))
    }
    
}

//! --------------------- ENVÍO DE CONTRASEÑA ------------------------------
const sendPassword = async (req, res, next) => {
    try {
        const {id} = req.params
        const userDB = await User.findById(id)
        const passwordSecure = randomPassword() //? generamos la contraseña nueva mediante un util

        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        
        const transporter = nodemailer.createTransport({ //? creamos el transporter: se encarga de hacer el envío del correo, es como el cartero que reparte las cartas
            service: 'gmail',
            auth: {
                user: email,
                pass: password,
            },
        });
        const mailOptions = { //? ------------------------------ seteamos las opciones del email que se envía
            from: email,
            to: userDB.email,
            subject: 'Your New Password',
            text: `${userDB.name}, your new password is ${passwordSecure}. If you have not solicited a password change, please get in contact with our team.`,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error)
                return res.status(404).json("An error came up while sending the password, so we did not update the password nor sent it")
            } else {
                console.log("Email sent: " + info.response);
                const newEncryptedPassword = bcrypt.hashSync(passwordSecure, 10); //? como hemos creado una nueva contraseña, hay que encriptarla como hicimos en el model con la original
                try {
                    await User.findByIdAndUpdate(id, {password: newEncryptedPassword}); //? cambiamos la antigua password por la nueva identificandonos dentro del usuario con su id
                    //todo ------------------- TEST EN EL RUNTIME (se ha actualizado?) ---------------------------
                    const userUpdatedPassword = await User.findById(id);
                    if (bcrypt.compareSync(passwordSecure, userUpdatedPassword.password)) { //? miramos si la contraseña creada es la misma que hay en el usuario en este momento
                        return res.status(200).json({updateUser: true, sendPassword: true}) //? se ha enviado la contraseña y tmb se ha cambiado correctamente. los dos a true
                    } else {
                        return res.status(404).json({updateUser: false, sendPassword: true}) //? se ha enviado pero no se ha cambiado, ha habido algún error ya que las contraseñas no coinciden
                    }
                } catch (error) {
                    return res.status(404).json({message: "Error en el catch del test del update password ❌", error: error.message})
                }
            }
        })
    } catch (error) {
        return next(setError(500, error.message || "Error general al enviar la contraseña NO AUTH ❌"))
    }
}

//! ------------------------- AUTH -------------------------------------------
const exampleAuth = async (req, res, next) => {
    const {user} = req;
    return res.status(200).json(user)
}

//! -------------------- CAMBIO DE CONTRASEÑA (logado) ----------------------
const modifyPassword = async (req, res, next) => {
    console.log("entro")
    try {
        const {password, newPassword} = req.body; //? --------------- contraseña antigua y nueva sin encriptar
        const validado = validator.isStrongPassword(newPassword); //? método para ver si supera las pruebas de seguridad
        if (validado) {
            const {_id} = req.user; //? ------------------------------ el id está guardado en el req.user
            if (bcrypt.compareSync(password, req.user.password)) { //? comparamos si la contraseña antigua no encriptada (password) es igual a antigua del backend encriptada (req.user.password)
                const newPasswordHashed = bcrypt.hashSync(newPassword, 10); //? hasheamos la contraseña para poder almacenarla en el backend
                try {
                    await User.findByIdAndUpdate(_id, {password: newPasswordHashed}); //? ACTUALIZAMOS. buscamos al usuario y le metemos la nueva contraseña ya encriptada. NO SE HACE CON SAVE (entraria el presave y se vuelve a hashear)
                    // todo -------- TEST ------------------
                    const userUpdate = await User.findById(_id); //? ----------------- buscamos usuario por id
                    if (bcrypt.compareSync(newPassword, userUpdate.password)) { //? -- Comparamos la nueva contraseña antes de encriptarla y despues para testear el encriptado
                        return res.status(200).json({updateUser: true});
                    } else {
                        return res.status(404).json({updateUser: false});
                    }
                } catch (error) {
                    return res.status(404).json({message: "error en el catch del update", error: error.message})
                }

            } else {
                return res.status(404).json("password does not match")
            }
        } else {
            return res.status(404).json("Invalid password ❌ Not strong enough")
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al enviar la contraseña NO AUTH ❌"))
    }
}

//! ------------------- UPDATE USER ----------------------------
const update = async (req, res, next) => {
    let catchImg = req.file?.path; //? capturamos imagen nueva subida a cloudinary
    try {
        await User.syncIndexes(); //? actualizamos los indices (elementos únicos)
        const patchUser = new User(req.body); //? instanciamos nuevo objeto del modelo de user con lo que yo mando en el body
        req.file && (patchUser.image = catchImg); //? si tenemos imagen, metemos a la instancia del model (linea anterior) la imagen capturada

       //! esta info no quiero que me la cambie
        patchUser._id = req.user._id;
        patchUser.password = req.user.password; //? LA CONTRASEÑA NO SE PUEDE MODIFICAR: ponemos la contraseña de la db
        patchUser.rol = req.user.rol; //?---------- Lo mismo con el rol, confirmationCode, check, NO SE PUEDE MODIFICAR POR AQUI
		patchUser.confirmationCode = req.user.confirmationCode
		patchUser.check = req.user.check
		patchUser.email = req.user.email;

        if (req.body?.gender) { //? como el genero es enum, no se puede modificar a cualquier cosa, ponemos la función que pusimos en el update de los characters
            const resultEnum = enumGenderOk(req.body?.gender);
            patchUser.gender = resultEnum.check
                ? req.body?.gender
                : req.user.gender
        }

        try {
            await User.findByIdAndUpdate(req.user._id, patchUser); //? buscamos el user y actualizamos lo que queremos actualizar (patchUser). NO HACEMOS SAVE 1r valor: objeto a actualizar. 2o valor: info a actualizar
            if (req.file) deleteImgCloudinary(req.user.image); //?---- si hay imagen en la request, borramos la que había antes en el backend

            //todo --------- TESTING -------------
            const updateUser = await User.findById(req.user._id); //? siempre lo primero: traemos el usuario actualizado para comparar con la info del body
            const updateKeys = Object.keys(req.body); //? ----------- las claves del request body son los elementos que quiero actualizar. las sacamos
            const testUpdate = [] //?-------------------------------- guardamos los testing y sus resultados
            updateKeys.forEach((key) => { //?------------------------ me recorro las keys del body, es decir, las propiedades que quiero modificar
                if (updateUser[key] === req.body[key]) { //?--------- miramos que la info actualizada sea la misma que hay en el body (lo que nos han dicho de actualizar)
                    if (updateUser[key] != req.user[key]) { //!------ miramos tambien que sea diferente a lo que ya había en el backend (para que no ponga actualizado cuando en vd no ha cambiado nada) // ESTA MAL PORQUE REQ.USER YA ESTA ACTUALIZADO, NO ESTAMOS ACCEDIENDO A LOS VALORES ANTIGUOS // NO ESTA MAL, LO HE COMPROBADO, PERO PREGUNTA COMO FUNCIONA???
                        testUpdate.push({  //?----------------------- pusheamos al array de los testing
                            [key]: true //?-------------------------- esta propiedad la ponemos a true porque se ha actualizado, ya que son iguales lo que hay en el backend y lo que hay ahora en el user
                        })
                    } else { //? si la info que había antes y la de ahora son iguales, indicamos que no ha cambiado nada, que la info pedida y la antigua es la misma
                        testUpdate.push({
                            [key]: "Same Old Info"
                        })
                    }
                } else { //? si la info del body y la del usuario actualizado no son iguales, le ponemos valor en false para indicar que no se ha actualizado
                    testUpdate.push({
                        [key]: false
                    })
                }
            })
            if (req.file) { //? la imagen va siempre aparte porque va por la request.file
                updateUser.image === catchImg  //? si la imagen del user actualizado es igual a la imagen nueva, guardada en el catch
                    ? testUpdate.push({ //? indicamos que la clave image es true, porque ha sido actualizada
                        image: true
                    })
                    : testUpdate.push({
                        image: false
                    })
            } //? cuando se ha finalizado el testing en el runtime, mandamos el usuario actualizado y el array con los test para ver qué se ha actualizado y qué no
            return res.status(200).json({updateUser, testUpdate})
        } catch (error) {
            req.file && deleteImgCloudinary(catchImg)
            return res.status(404).json({message: "Error al actualizar el usuario ❌", error: error.message})
        }
    } catch (error) {
        req.file && deleteImgCloudinary(catchImg)
        return next(setError(500, error.message || "Error general en el catch del update ❌"))
    }
}

//! --------------- DELETE ----------------
const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id); //? buscamos el user y lo eliminamos

        if (user) { //? si el user que queremos eliminar existe (tiene que hacerlo para poder eliminarlo)

            try { //? --------------------------------------- ELIMINAMOS AL USER DEL EQUIPO
                const test = await Team.updateMany( //? ----- ahora estamos cambiando en el model de Team para poder quitar el user que ya no existe
                    {likes: id}, //? ------------------------ queremos cambiar lo que sea que haya que cambiar en esta propiedad del model, si se omite se dice que se cambia cualquier conincidencia en todo el modelo. es la condición
                    {$pull: {likes: id}} //? ---------------- estamos diciendo que quite de la propiedad likes, el id indicado, es decir el del user que se ha eliminado. es la ejecución
                )
            } catch (error) {
                return next(setError(500, error.message || "Error al eliminar el user (like) del equipo ❌"))
            }

            try { //? -------------------------------------- ELIMINAMOS AL USER (follow) DEL USER
                const test = await User.updateMany( //? ---- ahora estamos cambiando en el model de User para poder quitar el user que ha dao follow que ya no existe
                    {followers: id}, //? ------------------- condición/ubicación del cambio (eliminación)
                    {$pull: {followers: id}} //? ----------- ejecución
                )
            } catch (error) {
                return next(setError(500, error.message || "Error al eliminar el user (follow) del user ❌"))
            }

            try { //? ---------------------------------------- ELIMINAMOS AL JUGADOR DEL ELEVEN
                const test = await Eleven.updateMany( //? ---- ahora estamos cambiando en el model de Eleven para poder quitar el jugador que ya no existe de los likes
                    {likes: id},
                    {$pull: {likes: id}}
                )
            } catch (error) {
                return next(setError(500, error.message || "Error al eliminar el user (like) del eleven ❌"))
            }

            try { //? ------------------------------------------ ELIMINAMOS AL USER DEL COMMENT
                const test = await Comment.updateMany( //? ----- ahora estamos cambiando en el model de comment para poder quitar el user que ya no existe
                    {likes: id}, //? --------------------------- queremos cambiar lo que sea que haya que cambiar en esta propiedad del model, si se omite se dice que se cambia cualquier conincidencia en todo el modelo. es la condición
                    {$pull: {likes: id}} //? ------------------- estamos diciendo que quite de la propiedad likes, el id indicado, es decir el del user que se ha eliminado. es la ejecución
                )
            } catch (error) {
                return next(setError(500, error.message || "Error al eliminar el user (like) del comment ❌"))
            }

            const findByIdUser = await User.findById(id); //? hemos encontrado este jugador? no debería existir porque lo hemos eliminado al ppio
            return res.status(findByIdUser ? 404 : 200).json({ //? si se encuentra hay un error, porque no se ha eliminado
                deleteTest: findByIdUser ? false : true, //? si existe, el test ha dado fallo y si no existe ha aprobado el test
            });
        } else {
            return res.status(404).json("este user no existe ❌"); //? si no existe el user antes de eliminarlo hay que dar error porque el jugador seleccionado para borrar no existia en un primer momento
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al eliminar el user ❌"))
    }
};

// todo -----------------------------------------------------
// todo -------------- EXTRA CONTROLLERS --------------------
// todo -----------------------------------------------------


//! ------------------- ADD FAV TEAM ----------------------
const addFavTeam = async (req, res, next) => {
    try {
        const {idTeam} = req.params; //? --- recibimos el id del equipo que queremos darle like por el url
        const elementTeam = await Team.findById(idTeam)
        console.log(elementTeam)
        const {_id, favTeams, name} = req.user; //? recibimos el id del user por el req.user porque es autenticado

        if (favTeams.includes(idTeam)){ //! ------------- PULL -----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $pull: {favTeams: idTeam} //? 2o param => ejecución (sacamos id de equipo del user)
                });
                try {
                    await Team.findByIdAndUpdate(idTeam, { //? aquí se actualiza el modelo de equipo para sacar al user como like
                        $pull: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        teamUpdate: await Team.findById(idTeam),
                        action: `Se ha quitado el equipo ${elementTeam.name} como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al quitar el User, del Team ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al quitar el Team, del User ❌", error: error.message})
            }
        } else { //! ---------- PUSH ----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $push: {favTeams: idTeam} //? 2o param => ejecución (metemos id de equipo en el user)
                });
                try {
                    await Team.findByIdAndUpdate(idTeam, { //? aquí se actualiza el modelo de equipo para meter al user como like
                        $push: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- // QUIERO HACER QUE SALGA EL NOMBRE DEL CLUB EN VEZ DEL ID EN LA LINEA 580
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        teamUpdate: await Team.findById(idTeam),
                        action: `Se ha añadido el equipo ${elementTeam.name} como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al añadir el User, al Team ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al añadir el Team, al User ❌", error: error.message})
            }
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al hacer toggle de Equipos Favoritos ❤️❌"))
    }
}

//! ------------------- ADD FAV PLAYER ----------------------
const addFavPlayer = async (req, res, next) => {
    try {
        const {idPlayer} = req.params; //? --- recibimos el id del equipo que queremos darle like por el url
        const elementPlayer = await Player.findById(idPlayer)
        const {_id, favPlayers, name} = req.user; //? recibimos el id del user por el req.user porque es autenticado y sabemos quien es por el token

        if (favPlayers.includes(idPlayer)){ //! ------------- PULL -----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $pull: {favPlayers: idPlayer} //? 2o param => ejecución (sacamos id del jugador del user)
                });
                try {
                    await Player.findByIdAndUpdate(idPlayer, { //? aquí se actualiza el modelo de jugador para sacar al user como like
                        $pull: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        playerUpdate: await Player.findById(idPlayer),
                        action: `Se ha quitado el jugador ${elementPlayer.name} como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al quitar el User, del Jugador ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al quitar el Jugador, del User ❌", error: error.message})
            }
        } else { //! ---------- PUSH ----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $push: {favPlayers: idPlayer} //? 2o param => ejecución (metemos id de jugador en el user)
                });
                try {
                    await Player.findByIdAndUpdate(idPlayer, { //? aquí se actualiza el modelo de jugador para meter al user como like
                        $push: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        playerUpdate: await Player.findById(idPlayer),
                        action: `Se ha añadido el jugador ${elementPlayer.name} como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al añadir el User, al Jugador ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al añadir el Jugador, al User ❌", error: error.message})
            }
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al hacer toggle de Jugadores Favoritos ❤️❌"))
    }
}

//! ------------------- ADD FAV ELEVEN ----------------------
const addFavEleven = async (req, res, next) => {
    try {
        const {idEleven} = req.params; //? --- recibimos el id del comentario que queremos darle like por el url
        const elementEleven = await Eleven.findById(idEleven)
        const {_id, favElevens, name} = req.user; //? recibimos el id del user por el req.user porque es autenticado y sabemos quien es por el token

        if (favElevens.includes(idEleven)){ //! ------------- PULL -----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $pull: {favElevens: idEleven} //? 2o param => ejecución (sacamos id del eleven del user)
                });
                try {
                    await Eleven.findByIdAndUpdate(idEleven, { //? aquí se actualiza el modelo de eleven para sacar al user como like
                        $pull: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        elevenUpdate: await Eleven.findById(idEleven),
                        action: `Se ha quitado el 11 ideal ${elementEleven.name} como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al quitar el User, del Eleven ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al quitar el Eleven, del User ❌", error: error.message})
            }
        } else { //! ---------- PUSH ----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $push: {favElevens: idEleven} //? 2o param => ejecución (metemos id de eleven en el user)
                });
                try {
                    await Eleven.findByIdAndUpdate(idEleven, { //? aquí se actualiza el modelo de eleven para meter al user como like
                        $push: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        elevenUpdate: await Eleven.findById(idEleven),
                        action: `Se ha añadido el 11 ideal ${elementEleven.name} como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al añadir el User, al Eleven ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al añadir el Eleven, al User ❌", error: error.message})
            }
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al hacer toggle de Elevens Favoritos ❤️❌"))
    }
}

//! ------------------- ADD FAV COMMENT ----------------------
const addFavComment = async (req, res, next) => {
    try {
        const {idComment} = req.params; //? --- recibimos el id del comentario que queremos darle like por el url
        const elementComment = await Comment.findById(idComment)
        const {_id, favComments, name} = req.user; //? recibimos el id del user por el req.user porque es autenticado y sabemos quien es por el token

        if (favComments.includes(idComment)){ //! ------------- PULL -----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $pull: {favComments: idComment} //? 2o param => ejecución (sacamos id del jugador del user)
                });
                try {
                    await Comment.findByIdAndUpdate(idComment, { //? aquí se actualiza el modelo de comment para sacar al user como like
                        $pull: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        commentUpdate: await Comment.findById(idComment),
                        action: `Se ha quitado el comentario "${elementComment.comment}" como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al quitar el User, del Comment ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al quitar el Comment, del User ❌", error: error.message})
            }
        } else { //! ---------- PUSH ----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $push: {favComments: idComment} //? 2o param => ejecución (metemos id de comment en el user)
                });
                try {
                    await Comment.findByIdAndUpdate(idComment, { //? aquí se actualiza el modelo de comment para meter al user como like
                        $push: {likes: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        userUpdate: await User.findById(_id),
                        commentUpdate: await Comment.findById(idComment),
                        action: `Se ha añadido el comentario "${elementComment.comment}" como favorito del usuario ${name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al añadir el User, al Comment ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al añadir el Comment, al User ❌", error: error.message})
            }
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al hacer toggle de Comentarios Favoritos ❤️❌"))
    }
}

//! ------------------- ADD FOLLOW --------------------
const addFollow = async (req, res, next) => {
    try {
        const {idUser} = req.params; //? --- recibimos el id del usuario que queremos darle follow por el url
        const elementUser = await User.findById(idUser)
        const {_id, followed, name} = req.user; //? recibimos el id del user por el req.user porque es autenticado y sabemos quien es por el token

        if (followed.includes(idUser)){ //! ------------- PULL -----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $pull: {followed: idUser} //? 2o param => ejecución (sacamos id del usuario seguido del user seguidor)
                });
                try {
                    await User.findByIdAndUpdate(idUser, { //? aquí se actualiza el modelo de usuario al que seguimos para sacar al user como follow
                        $pull: {followers: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        followerUserUpdate: await User.findById(_id), //? usuario que ha seguido
                        followedUserUpdate: await User.findById(idUser), //? usuario que ha sido seguido
                        action: `${name} ha dejado a seguir a ${elementUser.name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al unfollow del Usuario Seguido ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al unfollow del User ❌", error: error.message})
            }
        } else { //! ---------- PUSH ----------------
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $push: {followed: idUser} //? 2o param => ejecución (metemos id del usuario seguido del user seguidor)
                });
                try {
                    await User.findByIdAndUpdate(idUser, { //? aquí se actualiza el modelo de usuario al que seguimos para meter al user como follow
                        $push: {followers: _id}
                    });
                    
                    // todo --------- RESPONSE ------------- //
                    
                    return res.status(200).json({
                        followerUserUpdate: await User.findById(_id), //? usuario que ha seguido
                        followedUserUpdate: await User.findById(idUser), //? usuario que ha sido seguido
                        action: `${name} ha empezado a seguir a ${elementUser.name}`
                    })
                } catch (error) {
                    return res.status(404).json({error: 'Error al follow del Usuario Seguido ❌', message: error.message});
                }
            } catch (error) {
                return res.status(404).json({message: "Error al follow del User ❌", error: error.message})
            }
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al hacer toggle de Follow ❤️❌"))
    }
}

//! ------------------- GET FAV TEAMS ----------------------
const getFavTeams = async (req, res, next) => {
    try {
        const {id} = req.params //?----------------------------------- id del user por el param, vamos a buscar los favteams de este user
        const userById = await User.findById(id) //?------------------ encontramos el user por el id
        const usersFavTeams = userById.favTeams //?------------------- guardamos en variable los equipos favoritos encontrando su direccion
        const showTeams = await Team.find({_id: usersFavTeams}) //? -- le decimos que a los modelos de team que tengan los id que hemos encontrado en el usuario del param, nos los muestre
        return res
            .status(showTeams.length > 0 ? 200 : 404)
            .json(showTeams.length > 0 ? showTeams : "No se han encontrado equipos favoritos en el usuario ❌") //? se podría mirar de hacer que devolviese solo algunas claves, o el nombre, etc...
    } catch (error) {
        return next(setError(500, error.message || "Error general al buscar Equipos Favoritos ❤️❌"))
    }
}

//! ------------------- GET FAV PLAYERS ----------------------
const getFavPlayers = async (req, res, next) => {
    try {
        const {id} = req.params //?----------------------------------------- id del user por el param, vamos a buscar los favplayers de este user
        const userById = await User.findById(id) //?------------------------ encontramos el user por el id
        const usersFavPlayers = userById.favPlayers //?--------------------- guardamos en variable los jugadores favoritos encontrando su direccion
        const showPlayers = await Player.find({_id: usersFavPlayers}) //? -- le decimos que nos muestre los modelos de player que tengan los id que hemos encontrado en el usuario del param
        return res
            .status(showPlayers.length > 0 ? 200 : 404)
            .json(showPlayers.length > 0 ? showPlayers : "No se han encontrado jugadores favoritos en el usuario ❌") //? se podría mirar de hacer que devolviese solo algunas claves, o el nombre, etc...
    } catch (error) {
        return next(setError(500, error.message || "Error general al buscar Jugadores Favoritos en el Usuario ❤️❌"))
    }
}


module.exports = {
    //! MAIN
    registerLargo,
    registerEstado,
    registerWithRedirect,
    sendCode,
    getById,
    getAll,
    getByName,
    login,
    autologin,
    resendCode,
    checkNewUser,
    changePassword,
    sendPassword,
    exampleAuth,
    modifyPassword,
    update,
    deleteUser,
    
    //! EXTRA
    addFavTeam,
    addFavPlayer,
    addFavEleven,
    addFavComment,
    addFollow,
    getFavTeams,
    getFavPlayers
};