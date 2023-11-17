import "./About.css"

export const About = ({ about }) => {
    return (
        <section className="card">
            <ul className="quotes">
                {about.aboutMe.map((quote) => (
                    <li key = {quote.info}>{quote.info}</li>
                ))}
            </ul>
        </section>
    )
}