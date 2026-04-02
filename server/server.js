const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

/* =======================
   🔥 MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   🔥 MODELS
======================= */
const Dish = require("./models/dish");

/* =======================
   🔥 ROUTES
======================= */
const authRoutes = require("./routes/auth");   // ✅ NEW
const dishRoutes = require("./routes/dish");

app.use("/auth", authRoutes);   // ✅ IMPORTANT
app.use("/dish", dishRoutes);

/* =======================
   🔥 TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* =======================
   🔥 ADD DUMMY DATA
======================= */
app.get("/add", async (req, res) => {
  try {
    await Dish.deleteMany();

    const dishes = [
      { name: "Chicken Biryani", price: 300, category: "Popular", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398" },
      { name: "Paneer Butter Masala", price: 250, category: "Popular", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },

      { name: "Palak Paneer", price: 220, category: "Veg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7" },
      { name: "Malai Kofta", price: 240, category: "Veg", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976" },

      { name: "Chicken Tikka", price: 260, category: "Non-Veg", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143" },
      { name: "Mutton Curry", price: 350, category: "Non-Veg", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc" },

      { name: "Mango Lassi", price: 80, category: "Drinks", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4" },
      { name: "Masala Chai", price: 40, category: "Drinks", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3" },

      { name: "Gulab Jamun", price: 100, category: "Desserts", image: "https://images.unsplash.com/photo-1601050690117-9c1c7c6b0c5c" },
      { name: "Rasgulla", price: 90, category: "Desserts", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0" },
    ];

    await Dish.insertMany(dishes);

    res.send("Dummy data inserted 🚀");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error inserting data");
  }
});

/* =======================
   🔥 SOCKET SETUP
======================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// attach io to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* =======================
   🔥 DATABASE + SERVER
======================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/biryani")
  .then(() => {
    console.log("✅ MongoDB Connected");

    server.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });