import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Main from "./Main/Main";
import Card from "./Cards";

export default function Carometro(props) {
  const urlAPI = "http://localhost:5287/api/aluno";
  const urlAPICursos = "http://localhost:5287/api/curso";

  const initialState = {
    aluno: { id: 0, ra: "", nome: "", codCurso: 0 },
    curso: { id: 0, codCurso: "", nomeCurso: "", periodo: "" },
    listaAlunos: [],
    listaCursos: [],
  };

  const [aluno, setAluno] = useState(initialState.aluno);
  const [listaCursos, setListaCursos] = useState(initialState.listaCursos);
  const [listaAlunos, setListaAlunos] = useState(initialState.listaAlunos);
  const [curso, setCurso] = useState(initialState.curso);


  const getListaAlunosDoCurso = async (codCurso) => {
    return await axios(urlAPI)
    .then((resp) => {
        const listaCursos = resp.data;
        return listaCursos.filter(
            (aluno) => aluno.codCurso === codCurso
        );
    })
    .catch((err) => {
        console.log(err);

        //sendMultipleErrorPopUp(err);
    });
}

  const atualizarListaAlunos = async (event) => {
    const codCurso = event.target.value;
    if (event.target.value === "") {
      setListaAlunos(initialState.listaAlunos);
      setCurso(initialState.curso);
      return;
    }
    curso.codCurso = Number(codCurso);
    const listaDeAlunos = await getListaAlunosDoCurso(curso.codCurso);
    if (!Array.isArray(listaDeAlunos)) return;

    setListaAlunos(listaDeAlunos);
    setCurso(curso);
  };

  useEffect(() => {
     axios(urlAPICursos)
    .then((resp) => {
      setListaCursos(resp.data)        
    })
    .catch((err) => {
        console.log(err);
    });
  },);

  const renderSelect = () => {
    console.log(initialState.listaCursos);
    console.log(initialState.listaAlunos);
    return (
      <div className="select-container">
        <label> Curso: </label>
        <select
          className="selectCarometro"
          value={curso.codCurso}
          onChange={(e) => {
            atualizarListaAlunos(e);
          }}
          required
        >
          <option key="" value="">
            {" "}
            -- Escolha um curso --{" "}
          </option>
          {listaCursos.map((curso) => (
            <option key={curso.id} name="codCurso" value={curso.codCurso}>
              {curso.codCurso} - {curso.nomeCurso} : {curso.periodo}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="content">
      <Header {...props} />
      <main>
        <div>
        {renderSelect()}
          <Card />
        </div>
      </main>
    </div>
  );
}
