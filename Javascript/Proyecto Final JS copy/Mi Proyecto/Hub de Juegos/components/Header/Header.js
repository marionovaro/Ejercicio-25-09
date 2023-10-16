import { initController, changeColor } from "../../utils"
import { getUser } from "../../global/state/globalState";
import "./Header.css";

const templateHeader = () => `
 <div class="headercontainer">
        <div class="logocontainer">
            <img src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Javascript/Proyecto%20Final%20JS%20copy/Logo%20Header.png?raw=true" alt="Hub de Juegos Logo">
        </div>
        <nav>
            <div class="colorchangecontainer">
                <!-- <span class="material-symbols-outlined">
                    invert_colors
                    palette
                </span> -->
                <img src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/color%20circle%20statis.png?raw=true" 
                alt=""
                id="colorchangebutton"
                >
            </div>
            <div class="backtodashboardcontainer">
                <img 
                src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/back%20to%20dashboard%20icon.png?raw=true" 
                alt=""
                id="backtodashbutton"
                >
            </div>
            <div class="logoutcontainer">
                <img 
                src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/logout%20icon%202.png?raw=true" 
                alt=""
                id="logoutbutton"
                >
            </div>
        </nav>
    </div>
`

const addListeners = () => {
    const colorChange = document.getElementById("colorchangebutton")
    colorChange.addEventListener("click", (e) => {
        const color = changeColor();
        document.body.style.background = color;
    });

    const backToDashboard = document.getElementById("backtodashbutton")
    backToDashboard.addEventListener("click", (e) => {
        initController("Dashboard")
    });

    const buttonLogout = document.getElementById("logoutbutton");
    buttonLogout.addEventListener("click", () => {
        const userState = getUser().name; //? ------------ cogemos nombre del usuario
        const currentUser = localStorage.getItem(userState) //? ------------- miramos también si esta en el localstorage
        const parseCurrentUser = JSON.parse(currentUser) //? ----------- lo parseamos a JS
        const updateUser = {...parseCurrentUser, token: false}; //? ----------- lo copiamos y le damos token false para que nos desloge
        const stringUpdateUser = JSON.stringify(updateUser); //? pongo el copiado con token false en string para localstorage
        localStorage.removeItem(userState); //? ------------ borro el usuario del localstorage
        sessionStorage.removeItem("currentuser") //? --------- hago lo mismo (borro) en el session
        localStorage.setItem(userState, stringUpdateUser) //? en mi user, me pongo deslogado
        initController("Login") //? -------- como nos hemos ido, nos manda al login
    })
}

export const printTemplateHeader = () => {
    document.querySelector("header").innerHTML = templateHeader();
    addListeners();
}