import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/globals.css";

export default function Carometro() {
  const urlAPI = "http://localhost:5287/api/aluno";
  const urlAPICursos = "http://localhost:5287/api/curso";
  const initialState = {
    aluno: { id: 0, ra: "", nome: "", codCurso: 0 },
    curso: { id: 0, codCurso: "", nomeCurso: "", periodo: "" },
    listaCursos: [],
    listaAluno: [],
  };

  const [aluno, setAluno] = useState(initialState.listaAluno);
  const [listaCursos, setLista] = useState(initialState.listaCursos)
  const [curso, setCurso] = useState(initialState.curso)
  

  function geraStringAleatoria(tamanho) {
    let stringAleatoria = "";
    let caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return stringAleatoria;
  }
  const imgURL = () =>
    `https://avatars.dicebear.com/api/adventurer/${geraStringAleatoria(8)}.svg`;
  const [imgRam, setImgRam] = useState([]);

  const dataFromAPI = async () => {
    return await axios(urlAPI)
      .then((resp) => resp.data)
      .catch((err) => err);
  };


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
      setAluno(initialState.listaAluno);
      setLista(initialState.curso);
      return;
    }
    curso.codCurso = Number(codCurso);
    const listaDeAlunos = await getListaAlunosDoCurso(curso.codCurso);
    if (!Array.isArray(listaDeAlunos)) return;

    setAluno(listaDeAlunos);
    setLista(curso);
  };

  useEffect(() => {
    axios(urlAPICursos)
      .then((resp) => {
        setLista(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setImgRam(geraStringAleatoria);
  }, [aluno]);

  return (
    <>
      <div>
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

        <div class="cards">
          <div class="content">
            {listaCursos.map((carometro) => (
              <div key={carometro.id}>
                <div className="card-content">
                  <img class="w-full" src={imgURL()} alt="Avatar" />
                  <div>
                    <p>{carometro.ra}</p>
                    <p>{carometro.nome}</p>
                    <p>Curso: {carometro.codCurso}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
