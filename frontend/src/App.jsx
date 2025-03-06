import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ViajeProvider } from "./context/contextoViaje";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import FormularioItinerario from "./components/FormularioItinerario";
import Home from "./pages/Home";
//import Planificador from "./pages/Planificador";

function App() {
  return (
    <Router>
      <div>
        <h1>Mi Aplicación de Viajes</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/formulario">Formulario</Link>
            </li>
            <li>
              <Link to="/otro-formulario">Otro Formulario</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Planificador />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
