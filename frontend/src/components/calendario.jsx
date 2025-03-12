import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendario.css";

const Calendario = () => {
  const [date, setDate] = useState(new Date());

  // Lista de eventos con fecha
  const eventos = [];

  return (
    <div className="calendario-container">
      <Calendar
        onChange={setDate}
        value={date}
        className="custom-calendar"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const event = eventos.find(
              (e) => e.date === date.toISOString().split("T")[0]
            );
            return event ? <div className="event">{event.title}</div> : null;
          }
        }}
      />
      <p>Fecha seleccionada: {date.toDateString()}</p>
    </div>
  );
};

export default Calendario;
