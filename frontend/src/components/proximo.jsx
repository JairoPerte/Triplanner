import React from "react";
import { useNavigate } from "react-router-dom";

export default function Proximo({ viajes, eliminarViaje }) {
  const navigate = useNavigate();
  const hoy = new Date();
  //ignorar la hora solo la fecha
  hoy.setHours(0, 0, 0, 0);

  //Filtramos para que solo salgan los viajes cuya fecha sea mayor o igual a hoy
  const viajesFiltrados = viajes.filter((viaje) => {
    const fechaInicio = new Date(viaje.fechaInicio);
    return fechaInicio >= hoy;
  });

  const editar = (id) => {
    navigate(`/editarViaje/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Viajes Próximos</h2>
      {viajesFiltrados.length === 0 ? (
        //Si no hay mostramos:
        <p>No hay viajes disponibles.</p>
      ) : (
        <ul className="list-group">
          {viajesFiltrados.map((viaje) => (
            //Mostramos los viajes que cumplan con el filtro
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
                <strong>{viaje.nombre}</strong> -{" "}
                {viaje.id_lugar?.nombre || "Sin lugar"}{" "}
                {"| " + (viaje.id_lugar?.pais || "")}
                <br />
                <small>Fecha Inicio: {
                  // Formatamos la fecha a DD/MM/YYYY
                  new Date(viaje.fechaInicio).toLocaleDateString("es-ES")
                }</small>
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
