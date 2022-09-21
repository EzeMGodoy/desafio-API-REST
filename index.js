const express = require("express");
const useragent = require("express-useragent");
const path = require("path");
require("dotenv").config();
const productos = require("./routers/productos");

const app = express();

const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;

//! Middleware incorporado
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

//! Middleware de terceros
app.use(useragent.express());

app.use("/api", productos);

//! Middleware de manejo de errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Algo no salió bien");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment: ${ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
