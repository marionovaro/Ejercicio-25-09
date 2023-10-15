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
                <img src="C:/Users/icust/OneDrive/Documentos/OneDrive/Documentos/Bootcamp Developer/palette icon.gif" alt="">
            </div>
            <div class="backtodashboardcontainer">
                <img src="C:/Users/icust/OneDrive/Documentos/OneDrive/Documentos/Bootcamp Developer/gamepad(dashboard icon).gif" alt="">
            </div>
            <div class="logoutcontainer">
                <img src="C:/Users/icust/OneDrive/Documentos/OneDrive/Documentos/Bootcamp Developer/logout icon.gif" alt="">
            </div>
        </nav>
    </div>
`

// acabo de hacer el header, ahora falta crear printtemplateheader y ponerlo en inittemplate

export const printTemplateHeader = () => {
    document.querySelector("header").innerHTML = templateHeader();
}