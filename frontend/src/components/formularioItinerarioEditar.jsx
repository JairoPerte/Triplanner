import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Importamos de assets
import errorFile from "../assets/audio/error.mp3";
import notificationFile from "../assets/audio/notification.mp3";

export default function FormularioItinerario() {
  //Creamos los audios de la Api
  const error = new Audio(errorFile);
  const not = new Audio(notificationFile);

  const navigate = useNavigate();
  // ID desde URL
  const { id } = useParams();
  const [lugares, setLugares] = useState([]);
  const [fechaError, setFechaError] = useState(false);
  const [viaje, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    notas: "",
    color: "#000000",
    id_lugar: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  // Cargar lugares
  useEffect(() => {
    const backendURL = import.meta.env.VITE_API_HOST;
    fetch(`${backendURL}/lugares`)
      .then((res) => res.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error al obtener lugares:", error));
  }, []);

  // Cargamos el itinerario
  useEffect(() => {
    if (id) {
      const backendURL = import.meta.env.VITE_API_HOST;
      fetch(`${backendURL}/viajes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Asegúrate de que las fechas están en formato YYYY-MM-DD
          setFormData({
            nombre: data.nombre,
            fechaInicio: data.fechaInicio.slice(0, 10),
            fechaFin: data.fechaFin.slice(0, 10),
            notas: data.notas,
            color: data.color || "#000000",
            id_lugar: data.id_lugar,
          });
        })
        .catch((error) => console.error("Error al cargar itinerario:", error));
    }
  }, [id]);

  // Actualizar el estado del formulario
  const handleChange = (e) => {
    setFormData({
      ...viaje,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaInicio = new Date(viaje.fechaInicio);
    const fechaFin = new Date(viaje.fechaFin);

    if (fechaFin <= fechaInicio) {
      setFechaError(true);
      setTimeout(() => {
        setFechaError(false);
      }, 2000);
      error.play();
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_API_HOST;

      const response = await fetch(`${backendURL}/viajes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(viaje),
      });

      if (response.ok) {
        setFormData({
          nombre: "",
          fechaInicio: "",
          fechaFin: "",
          notas: "",
          id_lugar: "",
          color: "#000000",
        });
        setModalVisible(true);

        not.play();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("Error al guardar el itinerario:", response.status);
        error.play();
      }
    } catch (e) {
      console.error("Error en la petición:", e);
      error.play();
    }
  };

  return (
    <div className="position-relative">
      {modalVisible && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalVisible(false)}
                    autoFocus
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="fs-5 fw-bold text-center">
                    ¡{id ? "Viaje actualizado" : "Viaje guardado"} con éxito!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        className={modalVisible ? "pe-none opacity-50" : "mt-3"}
      >
        <div className="form-floating">
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={viaje.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
          <label htmlFor="nombre">Nombre:</label>
        </div>

        <br />

        <div className="form-floating">
          <input
            type="date"
            name="fechaInicio"
            id="fechaInicio"
            value={viaje.fechaInicio}
            onChange={handleChange}
            className="form-control"
            required
          />
          <label htmlFor="fechaInicio">Fecha de inicio: </label>
        </div>

        <br />

        <div className="form-floating">
          <input
            type="date"
            name="fechaFin"
            id="fechaFin"
            value={viaje.fechaFin}
            onChange={handleChange}
            className="form-control"
            required
          />
          <label htmlFor="fechaFin">Fecha de fin: </label>
        </div>

        <br />

        <div className="form-floating">
          <textarea
            name="notas"
            id="notas"
            value={viaje.notas}
            onChange={handleChange}
            className="form-control"
          ></textarea>
          <label htmlFor="notas">Notas generales: </label>
        </div>

        <br />

        <select
          name="id_lugar"
          id="id_lugar"
          value={viaje.id_lugar}
          onChange={handleChange}
          className="form-select"
          required
        >
          {lugares.map((lugar) => (
            <option key={lugar._id} value={lugar._id}>
              {lugar.nombre}
            </option>
          ))}
        </select>

        <br />

        <input
          type="color"
          name="color"
          value={viaje.color}
          id="color"
          onChange={handleChange}
          className="form-control"
          required
        />

        <button type="submit" className="mx-5 btn btn-info mt-4">
          {id ? "Actualizar" : "Guardar"}
        </button>
      </form>

      {fechaError && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  <i className="bi bi-exclamation-circle"></i> Error de Fechas
                </h5>
              </div>
              <div className="modal-body">
                <p className="fs-5 fw-bold text-center text-danger">
                  La fecha de fin debe ser posterior a la fecha de inicio.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setFechaError(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
