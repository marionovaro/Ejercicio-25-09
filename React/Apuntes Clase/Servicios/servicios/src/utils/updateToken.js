export const updateToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
        const parseUser = JSON.parse(user);
        return parseUser.token //? el token es un apartado del parseUser, donde vienen muchas cosas y una de ellas es el token
    }
}