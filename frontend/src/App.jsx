import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ViajeProvider } from "./context/contextoViaje";
import "./styles/App.css";
import Home from "./pages/Home";
import Lugares from "./pages/Lugares";
import Formulario from "./pages/Formulario";
import EditarViaje from "./pages/EditarViaje";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      <div
        className={`d-flex flex-column justify-content-between contenedor-main pt-4 `}
      >
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
                <Link to="/lugares" className="text-light text-decoration-none">
                  Lugares
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-4 mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/lugares" element={<Lugares />} />
            <Route path="/editarViaje/:id" element={<EditarViaje />} />
          </Routes>
        </div>

        <footer className="rounded-top-5 bg-dark text-light d-flex justify-content-between px-4">
          <p>&copy; 2025 Triplanner - Todos los derechos reservados.</p>
          <button
            className="btn btn-secondary mb-3 rounded-5"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <i className="bi bi-sun"></i>
            ) : (
              <i className="bi bi-moon"></i>
            )}
          </button>
        </footer>
      </div>
    </Router>
  );
}

export default App;
