import { createContext, useState } from "react";

//Crear contexto
const ContextoViaje = createContext();

//Proveer contexto
export const ViajeProvider = ({ children }) => {
  const [viajes, setViajes] = useState([]);

  //Función para añadir un viaje
  const addViaje = (newViaje) => {
    setViajes([...viajes, newViaje]);
  };

  return (
    <Tripcontext.Provider value={{ viajes, addViaje }}>
      {children}
    </Tripcontext.Provider>
  );
};

export default ContextoViaje;
