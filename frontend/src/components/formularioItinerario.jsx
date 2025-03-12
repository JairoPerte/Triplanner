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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendURL = process.env.API_HOST;
      const response = await fetch(`${backendURL}/viajes`, {
        // Reemplaza con la URL de tu backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Itinerario guardado con éxito!");
        // Opcional: Limpiar el formulario
        setFormData({
          nombre: "",
          fechaInicio: "",
          fechaFin: "",
          notas: "",
          lugar: "",
          color: "#000000",
        });
      } else {
        console.error("Error al guardar el itinerario:", response.status);
        // Manejar el error (mostrar un mensaje al usuario, etc.)
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      // Manejar el error de red o error del servidor
    }
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
