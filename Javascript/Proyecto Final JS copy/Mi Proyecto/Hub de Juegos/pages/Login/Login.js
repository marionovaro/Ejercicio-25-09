import { setUser, setUserData} from "../../global/state/globalState"
import { initController } from "C:/Users/icust/OneDrive/Documentos/OneDrive/Documentos/Bootcamp Developer/NEOLAND/Clonado Nuevo/Ejercicio-25-09/Javascript/Proyecto Final JS copy/Mi Proyecto/Hub de Juegos/utils/initController";
import "./Login.css"

const templateLogin = () => `
<div class="containerlogin">
    <div class="containerlogo">
        <img id="loginlogo" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Javascript/Proyecto%20Final%20JS%20copy/Login/Logo%20Hub%20de%20Juegos.png?raw=true">
    </div>
    <div class="instruccion">
        <h1 id="introdcirnombre">INTRODUCE TU NOMBRE!</h1>
    </div>
    <div class="contenido">
        <input id="username" type="text" placeholder="Nombre y Apellido">
        <button id="buttonlogin" type="submit">👍🏽</button>
    </div>
</div>
`

const addListenersLogin = () => {
    const buttonLogin = document.getElementById("buttonlogin");
    const username = document.getElementById("username");
    buttonLogin.addEventListener("click", () => {
        const valueInput = username.value;

    if (localStorage.getItem(`${valueInput}USER`)) { //? --------- estamos mirando si el nombre introducido ya consta como usuario para entrar a la misma cuenta donde puede tener guardados favoritos
        const localUser = localStorage.getItem(`${valueInput}USER`) //? ------------ establecemos localUser como el que hemos encontrado en el localstorage
        const parseUser = JSON.parse(localUser) //? ------------ convierto el user encontrado en string para leerlo en JS
        parseUser.token = true //? ------------ cuando ya lo podemos leer con JS y acceder a los valores del objeto le indicamos que estamos logados para que nos deje entrar

        const stringUser = JSON.stringify(parseUser); //? ------------ convertimos user de vuelta a string para leerlo en el localstorage
        localStorage.setItem(`${valueInput}USER`, stringUser) //? ------------ lo metes de nuevo al localstorage (quien?, info a meter)
        sessionStorage.setItem("currentUser", `${valueInput}USER`); //? ------------ lo metemos también en el sessionstorage
        setUser(`${valueInput}USER`) //? ------------ estamos estableciendo el nombre introducido en el input como currentUser.name, función creada en globalState.js

        setUserData(parseUser); //? le metemos el objeto en formato JS a la data del usuario
    } else { //? ---------- si no existe usuario con el nombre:
        const customUser = { //? ------ creo el objeto usuario con sus claves y valores
            name: valueInput,
            fav: [],
            token: true,
        };
        const stringUser = JSON.stringify(parseUser); //? ------------ convertimos user de vuelta a string para leerlo en el localstorage
        localStorage.setItem(`${valueInput}USER`, stringUser) //? ------------ lo metes de nuevo al localstorage (quien?, info a meter)
        sessionStorage.setItem("currentUser", `${valueInput}USER`); //? ------------ lo metemos también en el sessionstorage
        setUser(`${valueInput}USER`) //? ------------ estamos estableciendo el nombre introducido en el input como currentUser.name, función creada en globalState.js
      }

      initController();
    });
}


export const Login = () => {
    // document.querySelector("header").style.display = "none";
    // document.querySelector("footer").style.display = "none";
    document.querySelector("main").innerHTML = templateLogin();
    addListenersLogin();
}

