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

  useEffect(() => {
    let btnFavoritos = document.getElementById("favoritos");
    let btnTodos = document.getElementById("todos");

    let lugaresTodos = document.getElementsByClassName("accordion-item");
    let lugaresFavoritos = document.getElementsByClassName("fav");

    if (btnFavoritos && btnTodos) {
      btnFavoritos.addEventListener("click", () => {
        for (let i = 0; i < lugaresTodos.length; i++) {
          lugaresTodos[i].style.display = "none";
        }

        for (let i = 0; i < lugaresFavoritos.length; i++) {
          lugaresFavoritos[i].style.display = "block";
        }
      });

      btnTodos.addEventListener("click", () => {
        for (let i = 0; i < lugaresTodos.length; i++) {
          lugaresTodos[i].style.display = "block";
        }
      });
    }
  }, [lugares]);

  const toggleFavorito = (lugar) => {
    const newFavorito = lugar.favorito === 1 ? 0 : 1;

    //Actualizar estado localmente
    setLugares((prevLugares) =>
      prevLugares.map((l) =>
        l._id === lugar._id ? { ...l, favorito: newFavorito } : l
      )
    );

    //Hacer el request al backend para actualizar el estado
    const backendURL = import.meta.env.VITE_API_HOST;
    fetch(`${backendURL}/lugares/${lugar._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorito: newFavorito }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al actualizar el lugar:", response.status);
        }
      })
      .catch((error) => console.error("Error en la petición:", error));
  };

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

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const backendURL = import.meta.env.VITE_API_HOST;
      const response = await fetch(
        `${backendURL}/lugares/${lugarSeleccionado._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorito: 1 }),
        }
      );
      if (response.ok) {
        // Actualizar el estado sin recargar la página
        setLugares((prevLugares) =>
          prevLugares.filter((lugar) => lugar._id !== lugarSeleccionado._id)
        );
      } else {
        console.error("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="container vista-lugares">
      <div className="d-flex justify-content-between">
        <div className="filtro mb-2">
          <button className="btn btn-secondary" id="todos">
            Todos
          </button>
          <button className="btn btn-secondary  mx-3" id="favoritos">
            Favoritos
          </button>
        </div>
        <a href="#" data-bs-toggle="modal" data-bs-target="#modal">
          Añadir lugar
        </a>
      </div>

      <div className="accordion accordion-flush" id="acordeon">
        {lugares.map((lugar) => (
          <div
            className={`accordion-item ${
              lugar.favorito === 1 ? "fav" : "no-fav"
            }`}
            key={lugar._id}
          >
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
              <div className="accordion-body d-flex justify-content-between">
                <p className="mt-3">
                  {lugar.pais} - {lugar.ciudad} - {lugar.direccion}
                </p>

                <div className="d-flex gap-2">
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="favorito" value="1" required />
                    <button
                      onClick={() => toggleFavorito(lugar)}
                      className="btn btn-light"
                    >
                      <i
                        className={`bi ${
                          lugar.favorito === 1 ? "bi-heart-fill" : "bi-heart"
                        }`}
                        style={{ fontSize: "1.5rem", color: "#e74c3c" }}
                      ></i>
                    </button>
                  </form>
                  <form onSubmit={handleDelete}>
                    <input type="hidden" name="favorito" value="1" required />
                    <button
                      className="btn btn-light"
                      onClick={() => setLugarSeleccionado(lugar)}
                    >
                      <i
                        className="bi bi-trash-fill"
                        style={{ fontSize: "1.5rem", color: "#aaa" }}
                      ></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FormularioLugares setLugares={setLugares} />
    </div>
  );
}
