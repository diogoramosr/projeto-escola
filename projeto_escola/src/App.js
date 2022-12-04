import "./App.css";
import Logo from "./components/template/Logo/Logo";
import Navbar from "./components/template/Navbar/Navbar";
import Footer from "./components/template/Footer/Footer";
import Rotas from "./Rotas";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Navbar />
        <Rotas />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
