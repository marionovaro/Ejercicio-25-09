//! -------- MIDDLEWARE ----------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//! -------- UTILS -----------
const { generateToken } = require("../../utils/token");
const sendEmail = require("../../utils/sendEmail")
const randomCode = require("../../utils/randomCode");
const randomPassword = require("../../utils/randomPassword");
const enumOk = require("../../utils/enumOk");

//! -------- ESTADOS ----------
const { getSendEmail, setSendEmail } = require("../../state/state.data");

//! -------- LIBRERIAS ----------
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt")
const validator = require("validator");

//! --------- HELPERS --------
const setError = require("../../helpers/handle-error");

//! --------- MODELOS --------
const User = require("../models/User.model");
const TypeBike = require("../models/TypeBike.model");
const Bike = require("../models/Bike.model");

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
                const token = generateToken(userDB._id, email); //! creamos un token que nos diga que la comprobación ha sido exitosa y que permita al user acceder   ?????????????
                return res.status(200).json({user: userDB, token}) //? le damos el token al user para que sea suyo
            } else {
                return res.status(404).json("password is incorrect (do not match)")
            }
        } else {
            return res.status(404).json("User not found/is not registered")
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
            if (password === userDB.password) { //? cogemos la contraseña que nos ha dado el backend dp de ponerla el usuario (como nos la da el backend, ya esta encriptada)
                                               //? y NOSOTROS la metemos en el body al hacer el autologin, por lo tanto el body es email + contraseña encriptada y las comparamos. en el login se compara la de texto plano con la encriptada
                const token = generateToken(userDB._id, email);
                return res.status(200).json({user: userDB, token}) //? le damos el token al user (userDB) para que sea suyo
            } else {
                return res.status(404).json("password is incorrect (does not match)")
            }
        } else {
            return res.status(404).json("User not found/is not registered")
        }
    } catch (error) {
        return next(error)
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
                subject: 'Confirmation code',
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
                    return res.status(404).json({message: "error catch update", error: error.message}) //? mira si se ha actualizado el usuario corectamente 
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
            return res.status(404).json("User not found/is not registered")
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
            return res.redirect(307, `http://localhost:8080/api/v1/users/sendPassword/${userDB._id}`) //? llamamos a un redirect que genera contraseña nueva (lo hace: utils/randomPassword) y la envía
        } else {
            return res.status(404).json("User not found/is not registered")
        }
    } catch (error) {
        return next(setError(500 || "Error general al cambiar la contraseña"))
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
                    return res.status(404).json({message: "Error en el catch del test del update", error: error.message}) //! este catch es necesario si el else ya detecta el fallo en el update????
                }
            }
        })
    } catch (error) {
        return next(setError(500, error.message || "Error general al enviar la contraseña NO AUTH"))
    }
}

//! ------------------------- AUTH -------------------------------------------
const exampleAuth = async (req, res, next) => {
    const {user} = req;
    return res.status(200).json(user)
}
//? explicación a las 12.53

//! -------------------- CAMBIO DE CONTRASEÑA (logado) ----------------------
const modifyPassword = async (req, res, next) => {
    try {
        const {password, newPassword} = req.body; //? --------------- contraseña antigua y nueva sin encriptar
        const validado = validator.isStrongPassword(newPassword); //? método para ver si supera las pruebas de seguridad
        if (validado) {
            const {_id} = req.user; //? ------------------------------ el id está guardado en el req.user
            if (bcrypt.compareSync(password, req.user.password)) { //? comparamos si la contraseña antigua no encriptada (password) es igual a antigua del backend encriptada (req-user.password)
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
            return res.status(404).json("invalid password")
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al enviar la contraseña NO AUTH"))
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
            const resultEnum = enumOk(req.body?.gender);
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
            updateKeys.forEach((item) => { //?----------------------- me recorro las keys del body, es decir, las propiedades que quiero modificar
                if (updateUser[item] === req.body.item) { //?-------- miramos que la info actualizada sea la misma que hay en el body (lo que nos han dicho de actualizar)
                    if (updateUser != req.user[item]) { //?---------- miramos tambien que sea diferente a lo que ya había en el backend (para que no ponga actualizado cuando en vd no ha cambiado nada)
                        testUpdate.push({  //?----------------------- pusheamos al array de los testing
                            [item]: true //?------------------------- esta propiedad la ponemos a true porque se ha actualizado, ya que son iguales lo que hay en el backend y lo que hay ahora en el user
                        })
                    } else { //? si la info que había antes y la de ahora son iguales, indicamos que no ha cambiado nada, que la info pedida y la antigua es la misma
                        testUpdate.push({
                            [item]: "Same Old Info"
                        })
                    }
                } else { //? si la info del body y la del usuario actualizado no son iguales, le ponemos valor en false para indicar que no se ha actualizado
                    testUpdate.push({
                        [item]: false
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
            return res.status(404).json({message: "Error catch update (error al actualizar el usuario)", error: error.message})
        }
    } catch (error) {
        req.file && deleteImgCloudinary(catchImg)
        return next(setError(500, error.message || "Error general en el catch del update"))
    }
}

//! ------------------- DELETE USER ----------------------------
const deleteUser = async (req, res, next) => {
    try {
        // const {_id, image} = req.user; //? el destructuring no lo hacemos por la explicación que pongo mas adelante
        await User.findByIdAndDelete(req.user?.id) 
        deleteImgCloudinary(req.user?.image);
        try {
            await TypeBike.updateMany(
                {likes: req.user?._id},
                {$pull: {likes: req.user?._id}}
            );
            try {
                await Bike.updateMany(
                    {likes: req.user?._id},
                    {$pull: {likes: req.user?._id}}
                )
                const existUser = await User.findById(req.user?._id); //? le hemos puesto el req.user?._id en vez de solamente _id para que cuando intentemos borrar un elemento que no existe no rompa
                return res.status(existUser ? 404 : 200).json({deleteTest: existUser ? false : true}) //? `ponemos con ternarios los errores o exitos
            } catch (error) {
                return res.status(404).json({message: "Error catch delete en Bike", error: error.message})
            }
        } catch (error) {
            return res.status(404).json({message: "Error catch delete en TypeBike", error: error.message})
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general en el catch del DELETE"))
    }
}

//! ------------------- ADD FAV MOVIE ----------------------
const addFavTypeBike = async (req, res, next) => {
    try {
        const {idTypeBike} = req.params; //? recibimos el id por el req.user porque es autenticado
        const {_id, typebikeFav} = req.user;

        if (req.user.typebikeFav.includes(idTypeBike)){ //? si en los favoritos del user ya esta el tipo de moto: (pull) o (push).
            try {
                await User.findByIdAndUpdate(_id, { //? actualizamos el usuario. 1r param => condición ()
                    $pull: {typebikeFav: idTypeBike} //? 2o param => ejecución
                });
                try {
                    await Movie.findByIdAndUpdate(idTypeBike, {
                        $pull: {likes: _id}
                    });
                    
                    return res.status(200).json({})
                } catch (error) {

                }
            } catch (error) {
                return res.status(404).json({message: "", error: error.message})
            }
        } else {

        }
    } catch (error) {
        return next(setError(500, error.message || "Error general al añadir a Favoritos ❤️❌"))
    }
}


module.exports = {
    registerLargo,
    registerEstado,
    registerWithRedirect,
    sendCode,
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
    addFavTypeBike
};