import React, { useState, useEffect } from "react";
import Calendario from "../components/calendario";
import Proximo from "../components/proximo";

export default function Home() {
  const [viajes, setViajes] = useState([]);
  const backendURL = import.meta.env.VITE_API_HOST;

  useEffect(() => {
    fetch(`${backendURL}/viajes`)
      .then((res) => res.json())
      .then((data) => setViajes(data))
      .catch((error) => console.error("Error al obtener viajes:", error));
  }, []);

  const eliminarViaje = async (id) => {
    try {
      const res = await fetch(`${backendURL}/viajes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("No se ha conseguido eliminar");
        return;
      }

      // Actualizar lista de viajes en ambos componentes
      setViajes((prevViajes) => prevViajes.filter((viaje) => viaje._id !== id));
    } catch (error) {
      console.error("Error al eliminar viaje:", error);
    }
  };

  return (
    <div className="d-flex">
      <Calendario viajes={viajes} />
      <Proximo viajes={viajes} eliminarViaje={eliminarViaje} />
    </div>
  );
}
