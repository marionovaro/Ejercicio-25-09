import "./More.css"

export const More = ({ languages, habilities, hobbies}) => {
    return (
        <>
            <h4>Languages</h4>
            <section className="card languages">
                {languages.map((language) => (
                    <ul className = "language" key = {language.language}>
                        <li><h3>{language.language}</h3></li>
                        <li>🖊️ Writing: {language.wrlevel}</li>
                        <li>💭 Speaking: {language.splevel}</li>
                    </ul>
                ))}
            </section>
            <h4>Habilities</h4>
            <section className="card">
                {habilities.map((skill) => (
                    <ul className = "language" key = {skill}>
                        <li>🔧 {skill}</li>
                    </ul>
                ))}
            </section>
            <h4>Hobbies</h4>
            <section className="card hobbies">
                {hobbies.map((hobby) => (
                    <ul className = "hobby" key = {hobby}>
                        <li>{hobby}</li>
                    </ul>
                ))}
            </section>
        </>
    )
}