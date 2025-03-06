import React, { useState } from "react";

export default function FormularioItinerario() {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaHora: "",
    notas: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del lugar: ", formData);
  };

  return (
    <div>
      <h1>Añadir Lugar</h1>
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
        <label htmlFor="fechaHora">Fecha y Hora: </label>
        <input
          type="datetime"
          name="fechaHora"
          id="fechaHora"
          value={formData.fechaHora}
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
