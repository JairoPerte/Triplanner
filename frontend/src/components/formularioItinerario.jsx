import React, { useState } from "react";

export default function FormularioItinerario() {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    notas: "",
    color: "#000000",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del viaje: ", formData);
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
          <label htmlFor="nombre">Nombre:</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="date"
            name="fechaIncio"
            id="fechaIncio"
            value={formData.fechaInicio}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
          <label htmlFor="fechaIncio">Fecha de inicio: </label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="date"
            name="fechaFin"
            id="fechaFin"
            value={formData.fechaFin}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
          <label htmlFor="fechaFin">Fecha de fin: </label>
        </div>
        <br />
        <div className="form-floating">
          <textarea
            name="notas"
            id="notas"
            value={formData.notas}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          ></textarea>
          <label htmlFor="notas">Notas generales: </label>
        </div>
        <br />

        <label htmlFor="color" className="d-flex">
          Color:{" "}
        </label>
        <input
          type="color"
          name="color"
          value={formData.color}
          id="color"
          onChange={handleChange}
          className="form-control"
        />

        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
