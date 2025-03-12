import React, { useState } from "react";

export default function FormularioLugares() {
  const [formData, setFormData] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    direccion: "",
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
      const backendURL = import.meta.env.VITE_API_HOST;
      const response = await fetch(`${backendURL}/lugares`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Itinerario guardado con éxito!");
        setFormData({
          nombre: "",
          pais: "",
          ciudad: "",
          direccion: "",
        });
      } else {
        console.error("Error al guardar el lugar:", response.status);
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
            value={formData.nombre}
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
            type="text"
            name="pais"
            id="pais"
            value={formData.pais}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          />
          <label htmlFor="pais">País:</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="text"
            name="ciudad"
            id="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          />
          <label htmlFor="nombre">Ciudad:</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="form-control"
            placeholder=""
            required
          />
          <label htmlFor="nombre">Direccion:</label>
        </div>
        <br />

        <button type="submit" className="mx-5 btn btn-info mt-4">
          Guardar
        </button>

        <br />
      </form>
    </div>
  );
}
