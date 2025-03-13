import React from "react";
import FormularioItinerario from "../components/formularioItinerarioEditar";
import "../styles/index.css";

export default function EditarViaje() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4  formulario-viaje">
            <h1>Editar un viaje</h1>
            <FormularioItinerario />
          </div>
        </div>
      </div>
    </div>
  );
}
