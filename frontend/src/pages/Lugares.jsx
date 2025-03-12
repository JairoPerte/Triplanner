import React from "react";
import FormularioLugares from "../components/formularioLugares";

export default function Formulario() {
  return (
    <div className="container">
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
