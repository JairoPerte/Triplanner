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
    process.exit(1); // Sale del proceso si hay error
  });

app.use(express.json());
app.use(cors()); // Descomentar para evitar problemas con CORS

app.get("/", (req, res) => {
  res.send("✅ App is Working");
});

// Ruta de ejemplo
app.get("/pagina1", async (req, res) => {
  try {
    // Lógica para la página 1
    res.send("Página 1 funcionando");
  } catch (error) {
    res.status(500).json({ error: "Error en la página 1" });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal 😞");
});

app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
);
