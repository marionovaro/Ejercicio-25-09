import "./Education.css"

export const Education = ({ education }) => {
    return (
        <section className="card">
            {education.map((school) => (
                <ul className = "school" key = {school.name}>
                    <li><h3>📕 {school.name}</h3></li>
                    <li>{school.where}</li>
                    <li>{school.date}</li>
                </ul>
            ))}
        </section>
    )
}