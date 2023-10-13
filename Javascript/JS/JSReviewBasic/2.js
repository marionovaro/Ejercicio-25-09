// #2 Mix Fors
const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]

let total = 0
let cuenta = 0
for (let usuario of users) {
    // console.log(usuario)
    let sounds = usuario.favoritesSounds
    for (let tipo in sounds) {
        // console.log(sounds[tipo])
        let propertiesSonido = sounds[tipo]
        for (let final in propertiesSonido) {
            // console.log(propertiesSonido[final])
            typeof propertiesSonido[final] == "number" ? total += propertiesSonido[final] : null; 
            typeof propertiesSonido[final] == "number" ? cuenta++ : null;
        }
    }
}
let media = (total/cuenta)
console.log(media)
