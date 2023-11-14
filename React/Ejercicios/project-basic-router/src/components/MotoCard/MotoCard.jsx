export const MotoCard = ({ mark, model, cc, weight, horsepower }) => {
    return (
        <>
            <h2>{mark}</h2>
            <h1>{model}</h1>
            <h4>{cc}c³</h4>
            <h4>{weight}kg</h4>
            <h4>{horsepower}hp</h4>
        </>
    )
}