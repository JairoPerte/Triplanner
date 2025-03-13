import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendario.css";

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const backendURL = import.meta.env.VITE_API_HOST;

    fetch(`${backendURL}/viajes`)
      .then((res) => res.json())
      .then((data) => setViajes(data))
      .catch((error) => console.error("Error al obtener viajes:", error));
  }, []);

  // Función para verificar si un color es oscuro o claro
  const esColorOscuro = (hex) => {
    if (!hex) return false;
    const hexValue = hex.replace("#", "");
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    // Cálculo de luminancia relativa
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminancia < 0.5; // Si es menor a 0.5, es un color oscuro
  };

  // Función para obtener los eventos en un día específico
  const getEventosParaFecha = (date) => {
    return viajes
      .filter((viaje) => {
        const fechaInicio = new Date(viaje.fechaInicio);
        const fechaFin = new Date(viaje.fechaFin);
        return date >= fechaInicio && date <= fechaFin;
      })
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  };

  // Personalizar los días del calendario
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventosDelDia = getEventosParaFecha(date);

      return (
        <div className="event-container">
          {eventosDelDia.map((evento) => {
            const textoColor = esColorOscuro(evento.color) ? "white" : "black";

            return (
              <div
                key={evento._id}
                className="event"
                style={{ backgroundColor: evento.color, color: textoColor }}
              >
                {evento.nombre}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendario-container">
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className="custom-calendar"
      />
    </div>
  );
};

export default Calendario;
