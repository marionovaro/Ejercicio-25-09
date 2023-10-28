const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const User = require("../models/User.model");
const nodemailer = require("nodemailer")

const registerLargo = async (req, res) => {
    let catchImg = req.file?.path;
    try {
        await User.syncIndexes();
        const confirmationCode = randomCode();//? generamos el código de confirmación
        const {name, email} = req.body;

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
                    })

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
                            console.log(info) //? --------------------------------------------- la info nos da la respuesta del envío, si se ha hecho bien
                            return res.status(200).json({user: userSave, confirmationCode}) //? en este caso le decimos que se ha guardado el usuario y que el confirmationcode se ha enviado correctamente
                        }
                    })
                }
            } catch (error) {
                return res.status(404).json({message: "error en el catch del save", error: error.message})
            }

        } else { //? si el usuario ya existe: 
            req.file?.path && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
            return res.status(404).json("this user already exists!")
        }

    } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImg) //? como ha habido un error (intento de register ya estando register) si se ha subido una imagen hay que borrarla para que no quede basura en el backend sin usar
        return res.status(404).json({
             message: "error en el catch",
             error: error.message
            }) && next(error)
    }
}

module.exports = registerLargo;