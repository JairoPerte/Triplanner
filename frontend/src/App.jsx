import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ViajeProvider } from "./context/contextoViaje";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column justify-content-between contenedor-main pt-4">
        <div className="d-flex justify-content-between bg-dark py-3 px-5 rounded-5">
          <Link to="/" className="text-light text-decoration-none">
            <h1>Triplanner</h1>
          </Link>
          <nav className="mt-3">
            <ul className="d-flex list-unstyled">
              <li className="mx-5">
                <Link
                  to="/formulario"
                  className="text-light text-decoration-none"
                >
                  Organizador de Viajes
                </Link>
              </li>
              <li>
                <Link
                  to="/otro-formulario"
                  className="text-light text-decoration-none"
                >
                  Lugares
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formulario" element={<Formulario />} />
          </Routes>
        </div>

        <footer className="rounded-top-5 bg-dark text-light">
          <p>HOla</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
