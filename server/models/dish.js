const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  inStock: {
    type: Boolean,
    default: true,
  },
});

// 🔥 FIX: prevent overwrite error
module.exports = mongoose.models.Dish || mongoose.model("Dish", dishSchema);