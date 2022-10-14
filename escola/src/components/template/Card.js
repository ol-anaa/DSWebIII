import './Card.css';

export default function Card({nome,ra,codCurso,img}) {
    return(
        <div className="card">
            <img src={`${img}/${ra}.png?raw=true`} alt={ra} className="img" />
            <div className="container">
                <h4>{ra}</h4>
                <p>{nome}</p>
                <p>{codCurso}</p>
            </div>
        </div>
    )
}