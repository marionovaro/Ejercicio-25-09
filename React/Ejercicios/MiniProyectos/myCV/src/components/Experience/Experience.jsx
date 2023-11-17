import "./Experience.css"

export const Experience = ({ experience }) => {
    return (
        <section className="card">
            {experience.map((job) => (
                <ul className = "job" key = {job.description}>
                    <li><h3>📁 {job.name}</h3></li>
                    <li>{job.where}</li>
                    <li>{job.date}</li>
                    <li>{job.description}</li>
                </ul>
            ))}
        </section>
    )
}