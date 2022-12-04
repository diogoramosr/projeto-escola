import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AuthService from "../../../services/AuthService";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <>
      <nav className="navbar">
        <Link to="/alunos">Alunos</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/carometro">Carômetro</Link>
        {currentUser ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </>
  );
}
