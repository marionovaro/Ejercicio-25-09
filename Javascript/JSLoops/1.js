const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta']
// products.forEach(a => {
//     if (products.includes("Camiseta")) {
//         console.log(camiseta)
//     }
// });

// Con FOR NORMAL ---->
for (let a = 0; a < products.length; a++) {
    products[a].includes("Camiseta") ? console.log(products[a]) : null;
}

// Con FOR EACH ------>
products.forEach(elemento =>
    elemento.includes("Camiseta") ? console.log(elemento): null)

// Con FOR OF -------->
for (let a of products) {
    a.includes("Camiseta") ? console.log(a) : null;
}