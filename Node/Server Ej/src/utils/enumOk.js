const enumOk = (cylinders) => {
    const enumCylinders = [1, 2, 3, 4];
    if (enumCylinders.includes(cylinders)) {
        console.log("entro en el true");
        return {check : true, gender};
    } else {
        return {
            chceck: false,
        }
    }
}

module.exports = enumOk