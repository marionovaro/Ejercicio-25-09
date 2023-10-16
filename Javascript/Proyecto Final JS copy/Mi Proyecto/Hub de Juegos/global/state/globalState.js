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

