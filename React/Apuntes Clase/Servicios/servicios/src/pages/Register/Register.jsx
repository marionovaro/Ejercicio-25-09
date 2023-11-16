import "./Register.css"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { registerUser } from "../../services/user.service"
import { useErrorRegister } from "../../hooks"


export const Register = () => {

//todo 1) CREAMOS LOS ESTADOS -------------------------------------------------------------------------
//? ------- 1) Estado donde seteamos respuesta
//? ------- 2) Estado de loading (cargando..) para deshabilitar botones o envíos para que no se vuelva a enviar
//? ------- 3) Estado de navegación de errores con ok o no ok

const [res, setRes] = useState({}) //! ------------ 1) 
const [send, setSend] = useState(false) //! ------- 2)
const [ok, setOk] = useState(false) //! ----------- 3)


//todo 2) LLAMAMOS A LOS HOOK ---------------------------------------------------------------------------

const { handleSubmit, register } = useForm(); //? handleSubmit sirve para darle que funcion va a gestionar los datos que vienen del formulario
//? el register, registra estos datos (valores de los input) en un objeto
//? cuando el register hace el formData, lo recibe la función que el handleSubmit ha decidido que vaya a gestionarlos


//todo 3) FUNCION QUE GESTIONA LOS DATOS DEL FORMULARIO -------------------------------------------------

const formSubmit = async (formData) => { //? esta función llama al servicio (API)

}

//todo 4) USEFFECT QUE GESTIONAN RESPUESTA Y LLAMAN AL CUSTOMHOOK

useEffect(() => { //? gestionamos los errores con el customhook (useErrorRegister.jsx)
  useErrorRegister(res, setOk, setRes) //? res: qué tipo de status tiene?; setOk: cuando esté ok, que se ponga a true; setRes: si hay un error, seteamos la respuesta a inicial, y reiniciar el primer estado
}, [res])

//todo 5) GESTIÓN DE LOS ESTADOS DE NAVEGACIÓN O ESTADOS O OK
if (ok) { //? qué hacemos si el registro está ok: llevamos al usuario a la pagina de checkcode confirmation, renderizo otra pag.

}
  return (
    <h1>Register</h1>
  )
}
