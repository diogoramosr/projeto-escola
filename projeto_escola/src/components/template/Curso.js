import React, { useState, useEffect } from "react";
import "../../styles/globals.css"
import axios from "axios";
import Main from "./Main/Main";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

export default function Curso() {
  const API = "http://localhost:5287/api/curso";
  const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: "", periodo: "" },
    lista: [],
  };
  const [curso, setCurso] = useState(initialState.curso);
  const [lista, setLista] = useState(initialState.lista);
  const title = "Cadastro de Cursos";

  const dataFromAPI = async () => {
    return await axios(API)
      .then((resp) => resp.data)
      .catch((err) => err);
  };

  useEffect(() => {
    dataFromAPI().then(setLista).catch((error) => console.log(error))
  }, [curso]);

  const dadosDosInputs = (e) => {
    
    const { name, value } = e.target;
    setCurso({
      ...curso,
      [name]: value,
    });
    console.log(curso)
  };

  function listaAtualizada(curso, add = true) {
    const lista1 = lista.filter((a) => a.id !== curso.id);
    if (add) lista1.unshift(curso);
    return lista1;
  }

  const deletarCurso = async (curso) => {
    const url = API + "/" + curso.id;
    if (window.confirm("Deseja deletar o Curso: " + curso.codCurso)) {
      await axios["delete"](url, curso)
        .then((resp) => {
          let lista = listaAtualizada(resp.data);
          setCurso(initialState.curso);
          setLista(lista)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const alterarCurso = async (curso) => {
    setCurso(curso);
    console.log(curso);
  };

  const incluirCurso = async () => {
    const cursos = curso;
    curso.codCurso = Number(curso.codCurso);
    const url = curso.id ? `${API}/${cursos.id}` : API;
    const metodo = curso.id ? "put" : "post";
    if (window.confirm("Deseja incluir o Curso: " + cursos.codCurso)) {
      await axios[metodo](url, cursos)
        .then((resp) => {
          let lista = listaAtualizada(resp.data);
          setCurso(initialState.curso);
          setLista(lista);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const limpar = async () => {
    setCurso(initialState.curso);
  };

  const renderForm = () => {
    return (
      <div className="inclui-container">
        <label>Código do Curso</label>
        <input
          type="number"
          id="codCurso"
          placeholder="Codigo do curso"
          className="form-input"
          name="codCurso"
          value={curso.codCurso}
          onChange={dadosDosInputs}
        />
        <label>Curso:</label>
        <input
          type="text"
          id="nomeCurso"
          placeholder="Curso"
          className="form-input"
          name="nomeCurso"
          value={curso.nomeCurso}
          onChange={dadosDosInputs}
        />
        <label> Periodo: </label>
        <input
          type="text"
          id="periodo"
          placeholder="Periodo"
          className="form-input"
          name="periodo"
          value={curso.periodo}
          onChange={dadosDosInputs}
        />
        <button className="btnSalvar" onClick={() => incluirCurso(curso)}>
          Salvar
        </button>
        <button className="btnCancelar" onClick={() => limpar(curso)}>
          Cancelar
        </button>
      </div>
    );
  };
  const renderTable = () => {
    return (
      <div className="listagem">
        <table className="listaAlunos" id="tblListaAlunos">
          <thead className="cabecTabela">
            <tr className="cabecTabela">
              <th className="tabTituloRa">Código</th>
              <th className="tabTituloNome">Curso</th>
              <th className="tabTituloCurso">Período</th>
              <th className="tabTituloAcoes">Ações</th>{" "}
            </tr>
          </thead>
          <tbody>
            {lista.map((curso) => (
              <tr key={curso.id}>
                <td className="val-center">{curso.codCurso}</td>
                <td>{curso.nomeCurso}</td>
                <td className="val-center">{curso.periodo}</td>
                <td className="btnAcoes">
                  <button
                    className="btnAlterar"
                    onClick={() => alterarCurso(curso)}
                  >
                    <HiPencilAlt className="icon_bs"/>Alterar
                  </button>
                  <button
                    className="btnExcluir"
                    onClick={() => deletarCurso(curso)}
                  >
                    <HiTrash className="icon_bs"/>Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <Main title={title}>
      {renderTable()}
      {renderForm()}
    </Main>
  );
}
