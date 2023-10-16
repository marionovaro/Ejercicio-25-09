// import { initController } from "C:/Users/icust/OneDrive/Documentos/OneDrive/Documentos/Bootcamp Developer/NEOLAND/Clonado Nuevo/Ejercicio-25-09/Javascript/Proyecto Final JS copy/Mi Proyecto/Hub de Juegos/utils/initController";
import "./Login.css"

const templateLogin = () => `
<div class="containerlogin">
    <div class="containerlogo">
        <img id="loginlogo" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Javascript/Proyecto%20Final%20JS%20copy/Login/Logo%20Hub%20de%20Juegos.png?raw=true">
    </div>
    <div class="instruccion">
        <h1>INTRODUCE TU NOMBRE!</h1>
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
        const userToLocalStorage = {
            token: true,
            name: valueInput,
            fav: [],
        };
    })

}


export const Login = () => {
    document.querySelector("main").innerHTML = templateLogin();
}

