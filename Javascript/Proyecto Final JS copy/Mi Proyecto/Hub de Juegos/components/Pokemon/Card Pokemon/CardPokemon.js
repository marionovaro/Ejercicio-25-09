// import "./CardPokemon.css"

const template = ({name, image, type}) => `
<figure class=${type}>
    <figure class="secondcontainer">
        <div class="shape"></div>
        <div class="fotocontainer">
        <img class=${name} src=${image} alt=${name}/>
        </div>
    </figure>
    <div class="containername">
        <h3>${name}</h3>
    </div>
</figure>
`;

export const printCardPokemon = (pokemon) => {
    document.getElementById("galleryContainer").innerHTML += template(pokemon);
}