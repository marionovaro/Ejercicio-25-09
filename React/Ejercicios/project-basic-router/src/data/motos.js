let motos = [
        {
            id: 1,
            mark: "Yamaha",
            model: "MT-07",
            cc: 700,
            weight: 170,
            horsepower: 74.4
        },
        {
            id: 2,
            mark: "Kawasaki",
            model: "Z900",
            cc: 948,
            weight: 210,
            horsepower: 125
        },
        {
            id: 3,
            mark: "Honda",
            model: "CBR 650R",
            cc: 649,
            weight: 208,
            horsepower: 94.6
        },
        {
            id: 4,
            mark: "BMW",
            model: "S1000RR",
            cc: 999,
            weight: 197,
            horsepower: 210
        },
        {
            id: 5,
            mark: "Yamaha",
            model: "R1M",
            cc: 998,
            weight: 202,
            horsepower: 200
        },
        {
            id: 6,
            mark: "Kawasaki",
            model: "H2R",
            cc: 998,
            weight: 195,
            horsepower: 210
        },
]

export const getMotos = () => motos
export const getMoto = (id) => {
    return motos.find((moto) => moto.id.toString() === id
)};
export const deleteMoto = async (id) => {
    return motos = motos.filter((moto) => moto.id !== id)
}