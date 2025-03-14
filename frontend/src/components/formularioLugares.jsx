import React, { useState, useEffect } from "react";

//Importamos de assets
import errorFile from "../assets/audio/error.mp3";
import notificationFile from "../assets/audio/notification.mp3";

export default function FormularioLugares({ setLugares }) {
  //Creamos los audios de la Api
  const error = new Audio(errorFile);
  const not = new Audio(notificationFile);

  const [formData, setFormData] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    direccion: "",
    favorito: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);

  //Cerramos el modal después de 1 segundo
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  //Controlamos los cambios
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Creación del lugar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendURL = import.meta.env.VITE_API_HOST;
      const response = await fetch(`${backendURL}/lugares`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const nuevoLugar = await response.json();

        //Actulización dinámica
        setLugares((prevLugares) => [nuevoLugar, ...prevLugares]);

        setFormData({
          nombre: "",
          pais: "",
          ciudad: "",
          direccion: "",
          favorito: 0,
        });

        //Mostramos mensaje
        setModalVisible(true);
        not.play();
      } else {
        console.error("Error al guardar el lugar:", response.status);
        error.play();
      }
    } catch (e) {
      console.error("Error en la petición:", e);
      error.play();
    }
  };

  return (
    <div className="position-relative">
      <div
        className="modal fade"
        id="modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content formulario-lugar">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Añadir un Lugar
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="justify-content-center ">
                <div className="card mt-4 card-body-form">
                  <form
                    onSubmit={handleSubmit}
                    className={modalVisible ? "pe-none opacity-50" : "mt-3"}
                  >
                    <div className="form-floating">
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        required
                      />
                      <label htmlFor="nombre">Nombre:</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input
                        type="text"
                        name="pais"
                        id="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        required
                      />
                      <label htmlFor="pais">País:</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                      />
                      <label htmlFor="nombre">Ciudad:</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                      />
                      <label htmlFor="nombre">Direccion:</label>
                    </div>
                    <br />

                    <input type="hidden" name="favorito" value="0" required />

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      aria-label="Cerrar"
                      className="mx-5 btn btn-info mt-4"
                    >
                      Guardar
                    </button>

                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <>
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
                    ¡Lugar guardado con éxito!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
