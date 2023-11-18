import "./Mario.css"

export const Mario = ({ mario }) => {
    return (
        <section className="mario">
            <img src={mario.image} alt="Mario's image" />
            <article className="card">
                <h2>{`${mario.name} ${mario.surname}`}</h2>
                <p>🗺️ {mario.city}</p>
                <p>🗓️ {mario.birthDate}</p>
                <p>✉️ <a href={"mailto" + mario.email}/>{mario.email}</p>
                <p>📞 {mario.phone}</p>
                <p>🖱️ <a href={mario.gitHub}/>my GitHub</p>
            </article>
        </section>
    )
}