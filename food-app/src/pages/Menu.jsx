import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/dish")
      .then(res => res.json())
      .then(data => {
        const grouped = Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = {
                category: item.category,
                items: [],
              };
            }
            acc[item.category].items.push({
              ...item,
              outUntil: null,
            });
            return acc;
          }, {})
        );
        setMenuData(grouped);
      });
  }, []);

  const setOutOfStock = (item, hours) => {
    const time = new Date();
    time.setHours(time.getHours() + hours);

    updateItem(item._id, time);
  };

  const setCustomOut = (item) => {
    if (!customTime) return;
    updateItem(item._id, new Date(customTime));
  };

  const updateItem = (id, time) => {
    setMenuData(prev =>
      prev.map(cat => ({
        ...cat,
        items: cat.items.map(i =>
          i._id === id ? { ...i, outUntil: time } : i
        ),
      }))
    );

    setDrawerOpen(false);
    setSelectedItem(null);
  };

  const isOut = (item) => {
    if (!item.outUntil) return false;
    return new Date(item.outUntil) > new Date();
  };

  return (
    <>
      <Navbar />

      <div className="flex bg-black text-white min-h-screen">

        {/* LEFT SIDEBAR */}
        <div className="w-1/5 p-6 border-r border-gray-800 sticky top-0 h-screen">
          <h2 className="text-xl font-bold mb-6">Categories</h2>

          {menuData.map((cat, i) => (
            <div
              key={i}
              className="mb-3 cursor-pointer hover:text-orange-400"
              onClick={() =>
                document.getElementById(cat.category)?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              {cat.category}
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-4/5 p-10">

          <h1 className="text-4xl font-bold mb-10">
            Explore Our <span className="text-orange-500">Flavors</span>
          </h1>

          {menuData.map((cat, i) => (
            <div key={i} id={cat.category} className="mb-12">

              <h2 className="text-2xl text-orange-500 mb-6">
                {cat.category}
              </h2>

              <div className="grid grid-cols-3 gap-8">

                {cat.items.map(item => (
                  <div
                    key={item._id}
                    className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
                  >
                    <img
                      src={item.image}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-4">

                      <h3 className="text-lg font-bold">
                        {item.name}
                      </h3>

                      <p className="text-orange-400 font-semibold mt-2">
                        ₹{item.price}
                      </p>

                      {/* STATUS */}
                      <p className="mt-2 text-sm">
                        Status:{" "}
                        {isOut(item) ? (
                          <span className="text-red-500">
                            Unavailable
                          </span>
                        ) : (
                          <span className="text-green-500">
                            Available
                          </span>
                        )}
                      </p>

                      {/* BUTTON */}
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setDrawerOpen(true);
                        }}
                        className="mt-4 w-full bg-red-600 py-2 rounded-lg"
                      >
                        Out of Stock
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT DRAWER */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-[#111] p-6 shadow-lg transform transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedItem && (
            <>
              <h2 className="text-xl font-bold mb-4">
                Set Out of Stock
              </h2>

              <div className="flex flex-col gap-3">

                <button
                  onClick={() => setOutOfStock(selectedItem, 1)}
                  className="bg-gray-800 p-2 rounded"
                >
                  1 Hour
                </button>

                <button
                  onClick={() => setOutOfStock(selectedItem, 3)}
                  className="bg-gray-800 p-2 rounded"
                >
                  3 Hours
                </button>

                <button
                  onClick={() => setOutOfStock(selectedItem, 12)}
                  className="bg-gray-800 p-2 rounded"
                >
                  12 Hours
                </button>

                <button
                  onClick={() => setOutOfStock(selectedItem, 24)}
                  className="bg-gray-800 p-2 rounded"
                >
                  24 Hours
                </button>

                {/* CUSTOM */}
                <div className="mt-4">
                  <input
                    type="datetime-local"
                    className="w-full p-2 bg-gray-800 rounded"
                    onChange={(e) => setCustomTime(e.target.value)}
                  />

                  <button
                    onClick={() => setCustomOut(selectedItem)}
                    className="mt-2 w-full bg-orange-500 py-2 rounded"
                  >
                    Set Custom
                  </button>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="mt-6 text-red-500"
                >
                  Close
                </button>

              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
}