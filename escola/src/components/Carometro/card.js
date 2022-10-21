import './card.css';

export default function Card ({nome, ra, codCurso, img}){
    return(
        <main className='card-style'>
            <section>
                <img src={img} width={150} height={150}/> 
            </section>

            <section className='name-style'>{nome}</section>

            <section className='ra-style'>RA:{ra}</section>
            
            <section className='name-style'>
                {codCurso === 19 ? 'Informática' : codCurso === 39 ? 'DS Vesp' : 'DS Not'}
            </section>
        </main>
    )
}