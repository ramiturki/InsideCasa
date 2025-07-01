const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API InsideCasa !");
});

app.listen(5000, () => {
  console.log("Serveur backend démarré sur http://localhost:5000");
});
