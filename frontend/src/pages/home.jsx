import React, { useState, useEffect } from "react";
import Calendario from "../components/calendario";
import Proximo from "../components/proximo";

//Importamos de assets
import errorFile from "../assets/audio/error.mp3";
import notificationFile from "../assets/audio/notification.mp3";

export default function Home() {
  //Creamos los audios de la Api
  const error=new Audio(errorFile);
  const not=new Audio(notificationFile);

  //Para poder compartir el estado de viajes en ambos componentes utilizamos props
  const [viajes, setViajes] = useState([]);
  const backendURL = import.meta.env.VITE_API_HOST;

  //Obtenemos los datos de los viajes nada más abramos la página
  useEffect(() => {
    fetch(`${backendURL}/viajes`)
      .then((res) => res.json())
      .then((data) => setViajes(data))
      .catch((error) => console.error("Error al obtener viajes:", error));
  }, []);

  //Función que eliminará los viajes que coincidan con id eliminado
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
      //le damos al play al audio de bien
      not.play();
    } catch (e) {
      console.error("Error al eliminar viaje:", e);
      error.play();
    }
  };

  //Aquí empieza nuestro código html (accedemos a los componentes y le ponemos sus props)
  return (
    <div className="d-flex">
      <Calendario viajes={viajes} />
      <Proximo viajes={viajes} eliminarViaje={eliminarViaje} />
    </div>
  );
}
