import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import AuthService from "./services/AuthService";
import Main from "./components/template/Main/Main";
import CrudAluno from "./components/template/CrudAluno";
import Curso from "./components/template/Curso";
import Carometro from "./components/template/Carometro";
import Login from "./components/template/Login/Login";
import Logout from "./components/template/Logout/Logout";

export default function Rotas() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Main title="Bem Vindo !">
            <div>Cadastro de alunos, cursos e carômetro</div>
          </Main>
        }
      />
      <Route path="/alunos" element={<CrudAluno />} />
      <Route
        exact
        path="/cursos"
        element={<Curso title="Cadastro de Cursos"></Curso>}
      />
      <Route
        exact
        path="/carometro"
        element={<Carometro title="Carômetro"></Carometro>}
      />

      <Route exact path="/login" element={<Login title="Login"></Login>} />
      <Route path='/logout' element={<Logout />} />
      <Route path="*" to='/' />
    </Routes>
  );
}
