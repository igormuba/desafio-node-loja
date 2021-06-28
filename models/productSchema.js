const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: "",
    required: false,
  },
  image: {
    type: String,
    default: "",
    required: false,
  },
  category: {
    type: String,
    default: "",
    required: false,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    equired: true,
    validate(value) {
      if (value < 0) throw new Error("Preço do produto não pode ser negativo.");
    },
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
