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

        <select name="lugar" id="lugar" className="form-select">
          {/* Aquí debería haber un bucle recorriendo todos los lugares */}
          <option value="1">Lugar 1</option>
        </select>
        <br />
        <input
          type="color"
          name="color"
          value={formData.color}
          id="color"
          onChange={handleChange}
          className="color-input form-control"
        />

        <button type="submit" className="mx-5 btn btn-info mt-4">
          Guardar
        </button>

        <br />
      </form>
    </div>
  );
}
