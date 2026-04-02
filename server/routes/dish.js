const router = require("express").Router();
const Dish = require("../models/dish");

// ✅ GET ALL DISHES
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id/toggle", async (req, res) => {
  const dish = await Dish.findById(req.params.id);
  dish.inStock = !dish.inStock;
  await dish.save();

  res.json(dish);
});
module.exports = router;