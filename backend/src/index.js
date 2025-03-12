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

app.get("/", (req, res) => {
  res.send("✅ App is Working");
});

app.get("/viajes", async (req, res) => {
  try {
    // Mostrar todos los viajes
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar los viajes" });
  }
});

app.get("/lugares", async (req, res) => {
  try {
    // Mostrar todos los lugares
  } catch (error) {
    res.status(500).json({ error: "Error al mostrar los lugares" });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal");
});

app.listen(PORT, () =>
  console.log(
    `🚀 Servidor corriendo en el puerto ${PORT}\n   -> Local: http:\\localhost:${PORT}`
  )
);
