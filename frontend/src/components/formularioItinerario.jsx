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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="fechaIncio">Fecha de inicio: </label>
        <input
          type="date"
          name="fechaIncio"
          id="fechaIncio"
          value={formData.fechaInicio}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="fechaFin">Fecha de fin: </label>
        <input
          type="date"
          name="fechaFin"
          id="fechaFin"
          value={formData.fechaFin}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="notas">Notas generales: </label>
        <textarea
          name="notas"
          id="notas"
          value={formData.notas}
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="color">Color: </label>
        <input
          type="color"
          name="color"
          value={formData.color}
          id="color"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
