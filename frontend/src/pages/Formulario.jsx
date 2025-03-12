import React from "react";
import FormularioItinerario from "../components/formularioItinerario";
import "../styles/index.css";

export default function Formulario() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4 ">
            <h1>Organizar un viaje</h1>
            <FormularioItinerario />
          </div>
        </div>
      </div>
    </div>
  );
}
