//----------------------- fichier contenant l'application Express -----------------------//

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config.js");
const mongoSanitize = require("express-mongo-sanitize");

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
const likeRoutes = require("./routes/like");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${config.MONGO_DB_USERNAME}:${config.MONGO_DB_PASSWORD}@cluster0.mjtbt.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
// Pour éviter l'injection de code dans MongoDB
app.use(mongoSanitize());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/api/sauces", likeRoutes);

module.exports = app;
