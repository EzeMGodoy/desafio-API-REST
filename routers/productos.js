const router = require("express").Router();
const Contendor = require("../productos/classes");

//! ==== Se intancia la clase ====
const productos = new Contendor("./productos/productos.txt"); //? path correcto?

const notFoundMessage = { error: "Pagina no encontrada." };

//! ==== Middleware del router ====

// --> GET a todos los productos

router.get("/productos", async (req, res) => {
  const arrayProductos = await productos.getAll();
  if (!arrayProductos && arrayProductos.length < 1) {
    res.status(404).json(notFound);
  }
  res.status(200).json(arrayProductos);
});

// --> GET a productos por ID
router.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const producto = await productos.getById(id);
  if (!producto && producto.length < 1) {
    res.status(404).json(notFound);
  }
  res.status(200).json(producto);
});

// --> POST recibe y agrega un producto y lo devuelve con si id asignado
router.post("/productos", async (req, res) => {
  let { body: data } = req;
  await productos.save(data);
  res.status(200).json(data);
});

// --> PUT recibe y actualiza un producto segun si id
router.put("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let { body: data } = req;
  const arrayProductos = await productos.change(id, data);
  if (!arrayProductos) {
    res.status(404).json(notFoundMessage);
  } else {
    res.status(200).json({ message: "Producto actualizado correctamente" });
  }
});
// --> DELETE producto por id
router.delete("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const producto = await productos.deleteById(id);
  if (!producto) {
    res.status(404).json(notFoundMessage);
  }
  res.status(200).end();
});

module.exports = router;
