export const Saludo = () => {
    let date = new Date()
    let x = date.getHours()
    return (
    <h1>
        {x >= 6 && x <= 12 ? "Buenos días" :
            x > 12 && x <= 19 ? "Buenas tardes" :
            x > 19 && x < 24 || x >= 0 && x < 6 ? "Buenas noches" : null}
    </h1>
    )
}