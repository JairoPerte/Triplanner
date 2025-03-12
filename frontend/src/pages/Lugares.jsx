import React, { useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import FormularioLugares from "../components/formularioLugares";
import "../styles/index.css";

//PASAR A COMPONENTE
export default function Formulario() {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const backendURL = import.meta.env.VITE_API_HOST;
    fetch(`${backendURL}/lugares`)
      .then((res) => res.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []);

  return (
    <div className="container">
      <div className="accordion accordion-flush" id="acordeon">
        {lugares.map((lugar) => (
          <div className="accordion-item" key={lugar._id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${lugar._id}`}
                aria-expanded="false"
                aria-controls={`#flush-collapse${lugar._id}`}
              >
                <h2>{lugar.nombre}</h2>
              </button>
            </h2>
            <div
              id={`flush-collapse${lugar._id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#acordeon"
            >
              <div className="accordion-body">
                Placeholder content for this accordion, which is intended to
                demonstrate the <code>.accordion-flush</code> class. This is the
                first item's accordion body.
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4 ">
            <h1>Añadir un Lugar</h1>
            <FormularioLugares />
          </div>
        </div>
      </div>
    </div>
  );
}
