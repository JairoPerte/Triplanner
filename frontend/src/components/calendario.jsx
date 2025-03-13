import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendario.css";

const Calendario = ({ viajes }) => {
  //Dejamos que el usuario pueda seleccionar la fecha
  const [date, setDate] = useState(new Date());

  //Funcion que devuelve si el color es un color oscuro o claro (para cambiar el color de la letra)
  const esColorOscuro = (hex) => {
    if (!hex) return false;
    //Obtenemos los valores rgb del hexadecimal
    const hexValue = hex.replace("#", "");
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    //Hay que calcular la luminancia media de los colores primarios (rgb/255) que es valor máximo
    //Cuanto más cerca esté del 1 más blanco es mientras que si está más cerca del 0 pues es negro
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminancia < 0.5;
  };

  //Obtiene todos los viajes de ese día, además para hacer los viajes que son
  //en dias intermedios (ni inicio ni fin) pues tenemos que poner que el día que le pasamos esté
  //entre ambos, además le ponemos la hora que sea 0:0:0 para que se muestre siempre que sea ese dia
  //Y si hay más de un viaje ese día lo ordenamos según la fecha de inicio (muestra primero el más antiguo el que ha iniciado antes)
  const getEventosParaFecha = (date) => {
    return viajes
      .filter((viaje) => {
        const fechaInicio = new Date(viaje.fechaInicio);
        fechaInicio.setHours(0,0,0);
        const fechaFin = new Date(viaje.fechaFin);
        return date >= fechaInicio && date <= fechaFin;
      })
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  };

  //Crea los viajes y se lo asigna a los eventos
  const tileContent = ({ date, view }) => {
    //Si el usuario está en la vista donde se vean los dias (month) ya que se puede cambiar a year etc
    if (view === "month") {
      //obtenemoss todos los eventos (viajes) del día del Calendar API
      const eventosDelDia = getEventosParaFecha(date);

      //Creamos un contenedor para meter todos los eventos (viajes)
      return (
        <div className="event-container">
          {eventosDelDia.map((evento) => {
            //Dependiendo del color del fondo cambiamos el color de la letra
            const textoColor = esColorOscuro(evento.color) ? "white" : "black";

            //Creamos un evento que mantenga su key como id (se utilizará luego para eliminarlo), su nombre y su fondo + la letra acorde
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

  //Aquí empieza el html (cambia dinamicamente cuando clicka el usuario en un día) 
  //Y le asigna dentro los "eventos" osea los viajes
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
