import fs from "fs"
import puppeteer from "puppeteer"

// estamos creando la funcion que se encarga del scrapping web
const scrapping = async() => {
    //! const baseUrl = "https://motos.coches.net/segunda-mano/carretera/"
    const baseUrl = "https://www.idealista.com/areas/venta-viviendas/?shape=%28%28msr%7BFmydLedAsqA_aAgnF%7Ec%40o%7EAd%7DAvpBtq%40fdDum%40jiC%29%29"

// creamos el navegador (browser) ----> maximizado
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    })
    //abrimos pagina en el navegador
    const page = await browser.newPage()

    //navegamos a la base de la url de la baseUrl
    await page.goto(baseUrl)

    //esperamos un poco para que la pagina que atacamos, cargue
    await page.waitForTimeout(6000) // esperamos 6 segundos

    //hacemos varios scroll para cargar el maximo de elementos posibles
    await page.evaluate(()=>{
        //! const element = document.querySelector(".mt-SharedCorporateFooter"); // cogemos la class del footer y la guardamos
        const element = document.querySelector(".main-footer");
        const y = element.getBoundingClientRect().top + window.pageYOffset; // le buscamos la posicion del footer en la pagina
        window.scrollTo({top: y}) // decimos que haga scroll desde arriba hasta el footer para que carguen los elementos
    });

    //repetimos proceso varias veces para que llegue hasta ahi
    await page.waitForTimeout(6000) 

    await page.evaluate(()=>{
        //! const element = document.querySelector(".mt-SharedCorporateFooter"); // cogemos la class del footer y la guardamos
        const element = document.querySelector(".main-footer");
        const y = element.getBoundingClientRect().top + window.pageYOffset; // le buscamos la posicion del footer en la pagina
        window.scrollTo({top: y}) // decimos que haga scroll desde arriba hasta el footer para que carguen los elementos
    });

    await page.waitForTimeout(6000) 

    await page.evaluate(()=>{
        //! const element = document.querySelector(".mt-SharedCorporateFooter"); // cogemos la class del footer y la guardamos
        const element = document.querySelector(".main-footer");
        const y = element.getBoundingClientRect().top + window.pageYOffset; // le buscamos la posicion del footer en la pagina
        window.scrollTo({top: y}) // decimos que haga scroll desde arriba hasta el footer para que carguen los elementos
    });

    await page.waitForTimeout(6000) 

    await page.evaluate(()=>{
        //! const element = document.querySelector(".mt-SharedCorporateFooter"); // cogemos la class del footer y la guardamos
        const element = document.querySelector(".main-footer");
        const y = element.getBoundingClientRect().top + window.pageYOffset; // le buscamos la posicion del footer en la pagina
        window.scrollTo({top: y}) // decimos que haga scroll desde arriba hasta el footer para que carguen los elementos
    });

    await page.waitForTimeout(6000) 

    await page.evaluate(()=>{
        //! const element = document.querySelector(".mt-SharedCorporateFooter"); // cogemos la class del footer y la guardamos
        const element = document.querySelector(".main-footer");
        const y = element.getBoundingClientRect().top + window.pageYOffset; // le buscamos la posicion del footer en la pagina
        window.scrollTo({top: y}) // decimos que haga scroll desde arriba hasta el footer para que carguen los elementos
    });

    await page.waitForTimeout(6000)

    // le decimos que espera a que se renderizen los elementos de la pagina

    //! await page.waitForSelector(".mt-AnimationFadeOut mt-ListAds-item mt-CardAd mt-CardBasic")
    await page.waitForSelector("item_contains_branding item_hightop extended-item item-multimedia-container")

    // guardamos los elementos de la pantalla en objetos de JS
    //! const title = await page.$$eval("h2.mt-CardBasic-title", (nodos)=>
    const title = await page.$$eval(".item-link ", (nodos)=>
        nodos.map((nodo)=>nodo.innerText)
    );

    //! const img = await page.$$eval(".mt-GalleryBasic-sliderImage mt-GalleryBasic-sliderImage--squared", (nodos)=>
    const img = await page.$$eval("[parentElement = 'figure.item-gallery']", (nodos)=>
        nodos.map((nodo)=>nodo.src)
    );

    //! const price = await page.$$eval(".mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor", (nodos)=>
    const price = await page.$$eval("item-price h2-simulated", (nodos)=>
        nodos.map((nodo)=>nodo.innerText)
    );

    // hacemos un objeto completo con esta información
    const motosProduct = title.map((item, index) => ({
        title: title[index],
        image: img[index],
        price: price[index],
    }));

    // la útlima posición del array suele quedar vacía. La quitamos
    motosProduct.pop();
    console.log(motosProduct)

    await browser.close();
}
scrapping();