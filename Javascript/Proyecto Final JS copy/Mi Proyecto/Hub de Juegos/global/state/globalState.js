// !GET => obtener información
// ?SET => inyectar información


const currentUser = {
    name: sessionStorage.getItem("currentUser")
        ? sessionStorage.getItem("currentUser")
        : ""
};

let userData = localStorage.getItem(currentUser.name)
    ? JSON.parse(localStorage.getItem(currentUser.name))
    : {
        name: "",
        token: false,
        fav: [],
    };

//! ------------ Datos globales de la web entera -------------------

const dataGlobal = {
    pokemon: [],
    ricky: [],
}

// ! ------------- función que SETTEA ----------------------

export const setUser = (username) => {
    currentUser.name = username;
}

//! --------------- función que GET (retorna valor acutal de lo que me pides) -----
export const getUser = () => { //? pides usuario
    return currentUser; //? te retorno el que hay ahora
}

//! --------------- función que SETTEA (en este caso, gestiona los objetos creados arriba: dataGlobal, ya sea pokemon, o ricky)

export const setData = (data, page) => {
    switch (page) {
        case "Pokemon":
            dataGlobal.pokemon = data;
            break;
        case "Ricky":
            dataGlobal.ricky = data;
            break;
        default:
            break;
    }
}

// ! -------------- función que GET (en vez de actualizar los objetos, te da la información dentro de estos ----------------------

export const getData = (page) => {
    switch (page) {
        case "Pokemon":
            return dataGlobal.pokemon;
            break;
        case "Ricky":
            return dataGlobal.ricky;
            break;
    }
}


// ! -------------- función que SETTEA (los datos del usuario, los actualiza) -------------------

export const setUserData = (data) => {
    userData.fav = data?.fav; //? pregunta si en data, hay favoritos, para así ponerlos en la info de la cuenta (userData)
    userData.name = data?.name; //? lo mismo con el nombre

    const stringUser = JSON.stringify(userData);
    localStorage.removeItem(`${currentUser.name}`); //? borramos lo que habia anteriormente en el localstorage
    localStorage.setItem(`${currentUser.name}`, stringUser) //? meto con el nombre del usuario (currentUser.name), los datos ya puestos en string para el localstorage

}

//! -------------- función que GET (los datos del usuario)
export const getUserData = () => {
    return userData;
}
