import React, { useState } from "react";

export default function FormularioLugares() {
  const [formData, setFormData] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    direccion: "",
    favorito: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        setFormData({
          nombre: "",
          pais: "",
          ciudad: "",
          direccion: "",
          favorito: 0,
        });
        setModalVisible(true);
      } else {
        console.error("Error al guardar el lugar:", response.status);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
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
                    ¡Lugar guardado con éxito!
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

        <button type="submit" className="mx-5 btn btn-info mt-4">
          Guardar
        </button>

        <br />
      </form>
    </div>
  );
}
