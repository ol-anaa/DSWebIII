import React, { Component } from 'react';
import axios from 'axios';
import './Carometro.css';
//import Card from 'react-bootstrap/Card';
//import 'bootstrap'
import Main from '../template/Main';

const title = "Carômetro";

const urlAPI = "http://localhost:5255/api/aluno";
const urlAPICurso = "http://localhost:5255/api/curso";
const urlAPIAluno = "http://localhost:5255/api/aluno";

const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    lista: []
}

const imgUrl = 'https://avatars.githubusercontent.com/u/79612701?v=4';

export default class Carometro extends Component {

    state = {...initialState}

    componentDidMount() {
        axios(urlAPI)
        .then(result => {
            this.setState({lista: result.data})
        })
    }

    renderTable() {
        return (
            <div className= "ListaCards" >
                {
                    this.state.lista.map((aluno) =>
                        <div className="card" key={aluno.id}>
                            <img src={`${imgUrl}/${aluno.ra}.png?raw=true`} alt={aluno.ra} className="img" />
                            <div className="container">
                                <h4>{aluno.ra}</h4>
                                <p>{aluno.nome}</p>
                            </div>
                        </div>
                    )
                }
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