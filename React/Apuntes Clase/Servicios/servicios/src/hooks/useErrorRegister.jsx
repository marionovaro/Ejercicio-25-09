export const useErrorRegister = (res, setOk, setRes) => {
    //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
    //? si la respuesta no esta ok--> res.response.status
    //todo ------------------ 200 => TODO OK
    if (res?.status == 200) {
        setOk(() => true);
        Swal.fire({
        icon: "success",
        title: "Welcome to my Page 💌",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }

    //todo ------------------- 409 => USER YA REGISTRADO

    if (res?.response?.status === 409) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please , your email is incorrect !❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }

    //todo ------------------- CONTRASEÑA FORMATO INCORRECTO
    if (res?.response?.data?.includes("validation failed: password")) { //? si la respuesta del error incluye esto (siempre es el mismo mensaje por lo que debería incluirla) es que el error es el de formato de contraseña
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
        showConfirmButton: false,
        timer: 3000,
        });
        setRes({});
    }

      //todo ------------------- USERNAME EXISTE
    if (
        res?.response?.data?.includes(
        "E11000 duplicate key error collection: userProyect.users" //? lo mismo que en el error anterior
        )
    ) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry choose another name ❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }

      //todo -------------------- 500 => INTERNAL SERVER ERROR

    if (res?.response?.status == 500) { //? siempre hay que gestionar esto por si falla
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Interval server error!❎ Please try again.",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }
}