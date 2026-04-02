import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Chicken",
    highlight: "Biryani",
    desc: "Authentic Hyderabadi biryani with rich spices and aroma.",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
  },
  {
    title: "Dahi",
    highlight: "Puri",
    desc: "Crispy shells filled with tangy yogurt and chutneys.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
  {
    title: "Paneer",
    highlight: "Masala",
    desc: "Creamy and rich paneer curry with aromatic spices.",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <div className="relative h-[90vh] bg-black text-white overflow-hidden flex items-center px-16">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>

      {/* LEFT CONTENT */}
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-1/2"
      >
        <p className="text-sm tracking-widest text-orange-400 mb-3">
          LIMITED OFFER
        </p>

        <h1 className="text-6xl font-bold leading-tight">
          {current.title}{" "}
          <span className="text-orange-500">
            {current.highlight}
          </span>
        </h1>

        <p className="mt-5 text-gray-300 w-[400px]">
          {current.desc}
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-orange-500 px-6 py-3 rounded-lg text-lg hover:bg-orange-600">
            Order Online
          </button>

          <button className="bg-gray-800 px-6 py-3 rounded-lg text-lg">
            View Menu
          </button>
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        key={current.image}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 flex justify-center z-10"
      >
        <img
          src={current.image}
          className="w-[450px] h-[450px] object-cover rounded-xl shadow-2xl"
        />
      </motion.div>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-orange-500" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}