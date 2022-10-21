import React, { Component } from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import './Carometro.css';
import Card from "./card";
import Main from '../template/Main';

const title = "Carômetro";

const urlAPI = "http://localhost:5255/api/aluno";
const urlAPICurso = "http://localhost:5255/api/curso";

export default function Carometro() {
  const [cursos, setCursos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [inputCurso, setInputCurso] = useState([]);
  
  useEffect(() => {
    axios(urlAPI)
    .then(resp => {
      setAlunos(
        resp.data.map(aluno => ({
          id: aluno.id,
          ra: aluno.ra,
          nome: aluno.nome,
          codCurso: aluno.codCurso,
        }))
      );
    });
  }, []);
  
  useEffect(() => {
    axios(urlAPICurso)
    .then(resp => {
      setCursos(
        resp.data.map((curso) => ({
          id: curso.id,
          codCurso: curso.codCurso,
          nomeCurso: curso.nomeCurso,
          periodo: curso.periodo,
        }))
      );
    });
  }, []);
  
  const atualizaCurso = (codCurso) => {
    const curso = cursos.find((curso) => String(curso.codCurso) === codCurso);

    setInputCurso(curso);
  };

  const selectAlunos = (alunos) => {
    return inputCurso ? alunos.filter((aluno) => aluno.codCurso === inputCurso.codCurso) : alunos;
  };

  return(
    <Main>
      <section> 
        <div className='title-style'>{title}<br/></div>

        <select 
          className="select"
          onChange={(event) => atualizaCurso(event.target.value)}
          value={inputCurso ? cursos.find((curso) => curso.nomeCurso === inputCurso.nomeCurso)?.codCurso : ""}
        >
          
          <option disabled selected hidden>Selecione</option>

          {cursos.map((curso) => (
            <option value={curso.codCurso} key={curso.codCurso}>
              {curso.nomeCurso}
            </option>
          ))}

        </select>
      </section>

      {selectAlunos(alunos).map((aluno) => (
        <Card
          codCurso={aluno.codCurso}
          nome={aluno.nome}
          ra={aluno.ra}
          key={aluno.id}
          img={`https://avatars.dicebear.com/api/adventurer-neutral/${aluno.id}.svg`}
        />
      ))}
    </Main>
  );
}