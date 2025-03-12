import React, { useState, useEffect } from "react";

export default function FormularioItinerario() {
  const [lugares, setLugares] = useState([]);
  const [viaje, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    notas: "",
    color: "#000000",
    id_lugar: "",
  });

  useEffect(() => {
    const backendURL = import.meta.env.VITE_API_HOST;
    fetch(`${backendURL}/lugares`)
      .then((res) => res.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...viaje,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaInicio = new Date(viaje.fechaInicio);
    const fechaFin = new Date(viaje.fechaFin);

    if (fechaFin <= fechaInicio) {
      alert("La fecha de fin debe ser posterior a la fecha de inicio.");
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_API_HOST;
      const response = await fetch(`${backendURL}/viajes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(viaje),
      });

      if (response.ok) {
        console.log("Itinerario guardado con éxito!");
        setFormData({
          nombre: "",
          fechaInicio: "",
          fechaFin: "",
          notas: "",
          id_lugar: "",
          color: "#000000",
        });
      } else {
        console.error("Error al guardar el itinerario:", response.status);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
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
            value={viaje.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          />
          <label htmlFor="nombre">Nombre:</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="date"
            name="fechaInicio"
            id="fechaInicio"
            value={viaje.fechaInicio}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          />
          <label htmlFor="fechaInicio">Fecha de inicio: </label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="date"
            name="fechaFin"
            id="fechaFin"
            value={viaje.fechaFin}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          />
          <label htmlFor="fechaFin">Fecha de fin: </label>
        </div>
        <br />
        <div className="form-floating">
          <textarea
            name="notas"
            id="notas"
            value={viaje.notas}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          ></textarea>
          <label htmlFor="notas">Notas generales: </label>
        </div>
        <br />

        <select
          name="id_lugar"
          id="id_lugar"
          value={viaje.id_lugar}
          onChange={handleChange}
          className="form-select"
          required
        >
          {lugares.map((lugar) => (
            <option key={lugar._id} value={lugar._id}>
              {lugar.nombre}
            </option>
          ))}
        </select>
        <br />
        <input
          type="color"
          name="color"
          value={viaje.color}
          id="color"
          onChange={handleChange}
          className="color-input form-control"
          required
        />

        <button type="submit" className="mx-5 btn btn-info mt-4">
          Guardar
        </button>

        <br />
      </form>
    </div>
  );
}
