// Code  for mongoose config in backend
// Filename - backend/index.js
import env from "dotenv";
env.config();

// To connect with your mongoDB database
import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("users", UserSchema);
User.createIndexes();

// For backend and express
import express from "express";
const app = express();
import cors from "cors";
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("App is Working");
  // You can check backend is working or not by
  // entering http://loacalhost:5000

  // If you see App is working means
  // backend working properly
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something Went Wrong: " + e.message);
  }
});

app.get("/pagina1", async (req, resp) => {
  // Hacer la lógica para mostrar la página 1
});

app.listen(5000);
