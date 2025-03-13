import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error en la conexión a MongoDB:", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal");
});

// Definición de los esquemas y modelos para las colecciones 'viaje' y 'lugar'
const lugarSchema = new mongoose.Schema(
  {
    nombre: String,
    pais: String,
    ciudad: String,
    direccion: String,
    favorito: Number,
  },
  {
    collection: "lugares",
  }
);

const viajeSchema = new mongoose.Schema({
  nombre: String,
  fechaInicio: Date,
  fechaFin: Date,
  notas: String,
  color: String,
  id_lugar: { type: mongoose.Schema.Types.ObjectId, ref: "Lugar" },
});

const Lugar = mongoose.model("Lugar", lugarSchema);
const Viaje = mongoose.model("Viaje", viajeSchema);

// Rutas de Viajes
//obtiene todos los viajes
app.get("/viajes", async (req, res) => {
  try {
    const viajes = await Viaje.find()
      .populate("id_lugar")
      .sort({ fechaInicio: 1 });
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar los viajes" });
  }
});

//introduce un viaje nuevo
app.post("/viajes", async (req, res) => {
  try {
    const { nombre, fechaInicio, fechaFin, notas, color, id_lugar } = req.body;
    const viaje = new Viaje({
      nombre,
      fechaInicio,
      fechaFin,
      notas,
      color,
      id_lugar,
    });
    await viaje.save();
    res.status(201).json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir viaje" });
  }
});

//obtiene un viaje específico
app.get("/viajes/:id", async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id).populate("id_lugar");
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar el viaje" });
  }
});

//modifica un viaje específico
app.put("/viajes/:id", async (req, res) => {
  try {
    const { nombre, fechaInicio, fechaFin, notas, color, id_lugar } = req.body;
    const viaje = await Viaje.findByIdAndUpdate(
      req.params.id,
      { nombre, fechaInicio, fechaFin, notas, color, id_lugar },
      { new: true }
    ).populate("id_lugar");
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el viaje" });
  }
});

//borra un viaje
app.delete("/viajes/:id", async (req, res) => {
  try {
    const viaje = await Viaje.findByIdAndDelete(req.params.id);
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json({ message: "Viaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el viaje" });
  }
});

//Modificamos los datos de lugar de un viaje específico
app.patch("/viajes/:id", async (req, res) => {
  try {
    const { lugarData } = req.body;

    // Primero, actualizamos el lugar con los nuevos datos (si se proveen)
    const lugar = await Lugar.findById(req.body.id_lugar);
    if (!lugar) {
      return res.status(404).json({ error: "Lugar no encontrado" });
    }

    // Si recibimos datos nuevos para el lugar, los actualizamos
    if (lugarData) {
      const { nombre, pais, ciudad, direccion } = lugarData;
      lugar.nombre = nombre || lugar.nombre;
      lugar.pais = pais || lugar.pais;
      lugar.ciudad = ciudad || lugar.ciudad;
      lugar.direccion = direccion || lugar.direccion;

      await lugar.save();
    }

    // Ahora asociamos el lugar actualizado al viaje
    const viaje = await Viaje.findByIdAndUpdate(
      req.params.id,
      { id_lugar: lugar._id }, // Asociamos el lugar actualizado al viaje
      { new: true } // Retorna el viaje actualizado
    ).populate("id_lugar");

    if (!viaje) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    // Devolvemos el viaje actualizado con el lugar asociado
    res.json(viaje);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el viaje y asociar el lugar" });
  }
});

// Rutas de Lugares
//obtiene todos los lugares
app.get("/lugares", async (req, res) => {
  try {
    const lugares = await Lugar.find();
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar los lugares" });
  }
});

//añade un lugar
app.post("/lugares", async (req, res) => {
  try {
    const { nombre, pais, ciudad, direccion, favorito } = req.body;
    const lugar = new Lugar({ nombre, pais, ciudad, direccion, favorito });
    await lugar.save();
    res.status(201).json(lugar);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir el lugar" });
  }
});

//obtiene un lugar específico
app.get("/lugares/:id", async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id);
    if (!lugar) return res.status(404).json({ error: "Lugar no encontrado" });
    res.json(lugar);
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar el lugar" });
  }
});

//actualiza un lugar específico
app.put("/lugares/:id", async (req, res) => {
  try {
    const { nombre, pais, ciudad, direccion, favorito } = req.body;

    // Actualizar el lugar en la base de datos
    const lugar = await Lugar.findByIdAndUpdate(
      req.params.id,
      { nombre, pais, ciudad, direccion, favorito },
      { new: true } // Retorna el lugar actualizado
    );

    if (!lugar) {
      return res.status(404).json({ error: "Lugar no encontrado" });
    }

    // Devolver el lugar actualizado
    res.json(lugar);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el lugar" });
  }
});

//Elimina un lugar específico
app.delete("/lugares/:id", async (req, res) => {
  try {
    const lugar = await Lugar.findByIdAndDelete(req.params.id);
    if (!lugar) return res.status(404).json({ error: "Lugar no encontrado" });
    res.json({ message: "Lugar eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el lugar" });
  }
});

// Ruta para mostrar todos los viajes con los datos de los lugares
app.get("/viajes-lugares", async (req, res) => {
  try {
    const viajes = await Viaje.find().populate("id_lugar");
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar los viajes con lugares" });
  }
});

// Ruta para mostrar un viaje con su lugar asociado
app.get("/viajes-lugares/:id", async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id).populate("id_lugar");
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar el viaje con lugar" });
  }
});

//Ruta que filtra todos los viajes según si la fechaInicio es mayor a fecha
//devuelve los viajes+lugares cuyas fechaInicio sea mayores a la fecha que se le proporciona
app.get("/viajes-por-fecha", async (req, res) => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      return res.status(400).json({ error: "Se requiere una fecha" });
    }

    const viajes = await Viaje.find({ fechaInicio: { $gt: fecha } }).populate(
      "id_lugar"
    );
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los viajes por fecha" });
  }
});

app.listen(PORT, () =>
  console.log(
    `🚀 Servidor corriendo en el puerto ${PORT}\n  -> A través de localhost:${PORT}`
  )
);
