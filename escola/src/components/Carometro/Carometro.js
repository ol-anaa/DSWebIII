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
    lista: [],
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    listaCurso: []
}

const imgUrl = '';

export default class Carometro extends Component {

    state = {...initialState}

    componentDidMount() {
        axios(urlAPI)
        .then(result => {
            this.setState({lista: result.data})
        });
        axios(urlAPICurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })
    }

    renderForm() {
        return (
        <select name="nomeCurso" id="codigoCurso">
        {this.state.listaCurso.map((curso) =>
            <option key={curso.id} value={curso.codCurso}>{curso.nomeCurso}</option>
        )}
    </select>
        )
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
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}