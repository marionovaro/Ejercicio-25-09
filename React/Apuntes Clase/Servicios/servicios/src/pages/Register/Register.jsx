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
console.log(formData) //? nos da esto: {name: 'hola', password: 'hola123', email: 'hola@gmail.com'}

const customFormData = { //? le añadimos el genero pq es obligatorio y no lo tenemos en el html del return (apaño)
  ...formData,
  gender: "hombre"
}
//? hacemos llamada al servicio (API)
setSend(true) //? estmos cargando porque es llamada asincrona
setRes(await registerUser(customFormData)) //? seteamos la respuesta del serviio registerUser y le metemos el customFormData, como se setea la respuesta y esta cambia, se lanza el useEffect, que teneos res en al array de dependencias
//? ------------------------------------------ al lanzarse el useEffect se lanza el useErrorRegister, que analiza los errores si hay.
setSend(false) //? cuando ha acabado, se pone el send a false, pq ya no está cargando y vuelve a estar disponible el botón y cambia el texto que ambos tienen renderizado condicional
}

//todo 4) USEFFECT QUE GESTIONAN RESPUESTA Y LLAMAN AL CUSTOMHOOK

useEffect(() => { //? gestionamos los errores con el customhook (useErrorRegister.jsx)
  useErrorRegister(res, setOk, setRes) //? res: qué tipo de status tiene?; setOk: cuando esté ok, que se ponga a true; setRes: si hay un error, seteamos la respuesta a inicial, y reiniciar el primer estado
}, [res])

//todo 5) GESTIÓN DE LOS ESTADOS DE NAVEGACIÓN O ESTADOS O OK
if (ok) { //? qué hacemos si el registro está ok: llevamos al usuario a la pagina de checkcode confirmation, renderizo otra pag.

}
return (
  <>
    <div className="form-wrap">
      <h1>Sign Up</h1>
      <p>It’s free and only takes a minute.</p>
      <form onSubmit={handleSubmit(formSubmit)}> {/* el formSubmit va a gestionar los datos enviados por el form */}
        <div className="user_container form-group">
          <input 
            className="input_user"
            type="text"
            id="name"
            name="name"
            autoComplete="false"
            {...register("name", { required: true })} 
          /> {/* estamos metiendo un input por cada campo requerido para crear el user y creamos una copia de user y se añade lo que va poniendo el user */}
          <label htmlFor="custom-input" className="custom-placeholder">
            username
          </label>
        </div>
        <div className="password_container form-group">
          <input
            className="input_user"
            type="password"
            id="password"
            name="password"
            autoComplete="false"
            {...register("password", { required: true })}
          />
          <label htmlFor="custom-input" className="custom-placeholder">
            password
          </label>
        </div>
        <div className="email_container form-group">
          <input
            className="input_user"
            type="email"
            id="email"
            name="email"
            autoComplete="false"
            {...register("email", { required: true })}
          />
          <label htmlFor="custom-input" className="custom-placeholder">
            email
          </label>
        </div>

        <div className="btn_container">
          {console.log(send)}
          <button
            className="btn"
            type="submit"
            disabled={send}
            style={{ background: send ? "#49c1a388" : "#49c1a2" }}
          >
            {send ? "Cargando ...." : "Register"} {/* cuando se está enviando, por lo tanto que send es true, ponemos cargando o sin no register*/}
          </button>
        </div>
        <p className="bottom-text">
          <small>
            By clicking the Sign Up button, you agree to our{" "}
            <a href="#">Terms & Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </small>
        </p>
      </form>
    </div>
    <footer>
      <p>
        Already have an account? <a href="#">Login Here</a>
      </p>
    </footer>
  </>
);
};
