import React from "react";
import { useNavigate } from "react-router-dom";

export default function Proximo({ viajes, eliminarViaje }) {
  const navigate = useNavigate();
  const hoy = new Date();
  //ignorar la hora solo la fecha
  hoy.setHours(0, 0, 0, 0);

  const viajesFiltrados = viajes.filter((viaje) => {
    const fechaInicio = new Date(viaje.fechaInicio);
    fechaInicio.setHours(0, 0, 0, 0);
    return fechaInicio >= hoy;
  });

  const editar = (id) => {
    navigate(`/editarViaje/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Viajes Próximos</h2>
      {viajesFiltrados.length === 0 ? (
        <p>No hay viajes disponibles.</p>
      ) : (
        <ul className="list-group">
          {viajesFiltrados.map((viaje) => (
            <li
              key={viaje._id}
              className="list-group-item d-flex align-items-center"
            >
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
                <strong>{viaje.nombre}</strong> -{" "}
                {viaje.id_lugar?.nombre || "Sin lugar"}{" "}
                {"| " + (viaje.id_lugar?.pais || "")}
                <br />
                <small>
                  Fecha Inicio:{" "}
                  {new Date(viaje.fechaInicio).toLocaleDateString("es-ES")}
                </small>
                <br />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarViaje(viaje._id)}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => editar(viaje._id)}
                  className="btn btn-info btn-sm mx-3"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
