const express = require("express");
const ProductSchema = require("../models/productSchema");
const app = express();
const auth = require("../middleware/auth");
const UserSchema = require("../models/userSchema");

async function onlyCRUDAuthorized(id, response) {
  let user = await UserSchema.findById(id);

  if (!user.productCRUD) {
    response.status(401).send("Apenas pessoal autorizado");
  }
}

app.get("/products", async (request, response) => {
  const products = await ProductSchema.find({});

  try {
    response.send(products);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/products", auth, async (request, response) => {
  console.log(request.user);
  await onlyCRUDAuthorized(request.user.id, response);

  const product = new ProductSchema(request.body);

  try {
    await product.save();
    response.send(product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/products/:id", async (request, response) => {
  const product = await ProductSchema.findById(request.params.id);

  try {
    response.send(product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/products/:id", auth, async (request, response) => {
  await onlyCRUDAuthorized(request.user.id, response);

  try {
    await ProductSchema.findByIdAndUpdate(request.params.id, request.body);
    await ProductSchema.save();
    response.send(product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/products/:id", auth, async (request, response) => {
  await onlyCRUDAuthorized(request.user.id, response);

  try {
    await ProductSchema.findByIdAndDelete(request.params.id, request.body);
    await ProductSchema.save();
    response.send("ok");
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/products/:id", auth, async (request, response) => {
  await onlyCRUDAuthorized(request.user.id, response);

  try {
    const product = await ProductSchema.findByIdAndDelete(request.params.id);

    if (!product) response.status(404).send("Produto não encontrado");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
