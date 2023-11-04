const enumOk = (gender) => {
    const enumGender = ["hombre", "mujer", "otros"];
    if (enumGender.includes(gender)) {
        console.log("entro en el true");
        return {check : true, gender};
    } else {
        return {
            chceck: false,
        }
    }
}

module.exports = enumOk