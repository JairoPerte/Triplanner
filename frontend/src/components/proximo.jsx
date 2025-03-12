import React, { useState, useEffect } from "react";

export default function Proximo() {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const fechaHoy = new Date().toISOString().split("T")[0];
    const backendURL = import.meta.env.VITE_API_HOST;

    fetch(`${backendURL}/viajes-por-fecha?fecha=${fechaHoy}`)
      .then((res) => res.json())
      .then((data) => setViajes(data))
      .catch((error) => console.error("Error al obtener viajes:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Viajes Próximos</h2>
      {viajes.length === 0 ? (
        <p>No hay viajes disponibles.</p>
      ) : (
        <ul className="list-group">
          {viajes.map((viaje) => (
            <li key={viaje._id} className="list-group-item d-flex align-items-center">
              <span
                className="me-3"
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: viaje.color,
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
              <div>
                <strong>{viaje.nombre}</strong> - {viaje.id_lugar?.nombre || "Sin lugar"} {"| "+viaje.id_lugar?.pais || ""} 
                <br />
                <small>Fecha Inicio: {new Date(viaje.fechaInicio).toLocaleDateString()}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
