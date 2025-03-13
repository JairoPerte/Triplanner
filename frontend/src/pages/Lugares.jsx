import React, { useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import FormularioLugares from "../components/formularioLugares";
import "../styles/index.css";

export default function Formulario() {
  const [lugares, setLugares] = useState([]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const backendURL = import.meta.env.VITE_API_HOST;
    fetch(`${backendURL}/lugares`)
      .then((res) => res.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lugarSeleccionado) {
      console.error("No se ha seleccionado ningún lugar.");
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_API_HOST;
      const response = await fetch(
        `${backendURL}/lugares/${lugarSeleccionado._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorito: 1 }),
        }
      );

      if (response.ok) {
        setLugares((prevLugares) =>
          prevLugares.map((lugar) =>
            lugar._id === lugarSeleccionado._id
              ? { ...lugar, favorito: 1 }
              : lugar
          )
        );
        setModalVisible(true);
      } else {
        console.error("Error al guardar el lugar:", response.status);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="filtro">
          <button className="btn btn-secondary">Favoritos</button>
          <button className="btn btn-secondary mx-3">Todos</button>
        </div>
        <a href="#" data-bs-toggle="modal" data-bs-target="#modal">
          Añadir lugar
        </a>
      </div>

      <div className="accordion accordion-flush" id="acordeon">
        {lugares.map((lugar) => (
          <div className="accordion-item" key={lugar._id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${lugar._id}`}
                aria-expanded="false"
                aria-controls={`#flush-collapse${lugar._id}`}
              >
                <h2>{lugar.nombre}</h2>
              </button>
            </h2>
            <div
              id={`flush-collapse${lugar._id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#acordeon"
            >
              <div className="accordion-body">
                {lugar.pais} - {lugar.ciudad} - {lugar.direccion}
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="favorito" value="1" required />
                  <button
                    type="submit"
                    onClick={() => setLugarSeleccionado(lugar)}
                  >
                    Fav
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        class="modal fade"
        id="modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Añadir un Lugar
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div class="modal-body">
              <div className="justify-content-center">
                <div className="card mt-4 ">
                  <FormularioLugares />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
