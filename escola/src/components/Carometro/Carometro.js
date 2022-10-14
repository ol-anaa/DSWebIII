import React, { Component } from 'react';
import axios from 'axios';
import './Carometro.css';
import Main from '../template/Main';

const title = "Carômetro";

const urlAPI = "http://localhost:5255/api/aluno";
const urlAPICurso = "http://localhost:5255/api/curso";

const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: [],
    listaCurso: [],
}

const imgUrl = 'https://avatars.githubusercontent.com/u/105469302?v=4';

export default class Carometro extends Component {

    state = {...initialState}

    componentDidMount() {
        axios(urlAPICurso)
        .then(resp => {
            this.setState({ listaCurso: resp.data })
        })
    }

    changeCurso(event){
        axios(urlAPI)
        .then(result => {
            this.setState({lista: result.data})
        })

        
        this.state.lista.map((aluno) =>
        <div className="card" key={aluno.id}>
                <img src={`${imgUrl}/${aluno.ra}.png?raw=true`} alt={aluno.ra} className="img" />
                <div className="container">
                    <h4>{aluno.ra}</h4>
                    <p>{aluno.nome}</p>
                    <p>{aluno.codCurso}</p>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <div className= "lista-cards" >
                <select id="cursoSelecionado" height={150} onChange={event => this.changeCurso(event.target.value)}>
                    {this.state.listaCurso.map((curso) =>
                        <option key={curso.id} value={curso.codCurso}>{curso.nomeCurso}</option>
                    )}                
                </select>
                
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}