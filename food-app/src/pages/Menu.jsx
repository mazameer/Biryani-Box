import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ FIX: fallback role (IMPORTANT)
  const role = localStorage.getItem("role") || "admin";

  useEffect(() => {
    fetch("http://localhost:5000/dish")
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) return;

        const grouped = Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = {
                category: item.category,
                items: [],
              };
            }
            acc[item.category].items.push(item);
            return acc;
          }, {})
        );

        setMenuData(grouped);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleStock = async (id) => {
    try {
      await fetch(`http://localhost:5000/dish/${id}/toggle`, {
        method: "PUT",
      });

      setMenuData(prev =>
        prev.map(cat => ({
          ...cat,
          items: cat.items.map(item =>
            item._id === id
              ? { ...item, inStock: !item.inStock }
              : item
          ),
        }))
      );

      if (selectedItem && selectedItem._id === id) {
        setSelectedItem(prev => ({
          ...prev,
          inStock: !prev.inStock,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex">

        {/* LEFT SIDEBAR */}
        <div className="w-1/4 p-6 border-r bg-gray-50 sticky top-0 h-screen">
          <h2 className="text-xl font-bold mb-4">Menu</h2>

          {menuData.map((cat, i) => (
            <div
              key={i}
              className="cursor-pointer mb-2 hover:text-orange-500"
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
        <div className="w-3/4 p-8">
          {menuData.map((cat, i) => (
            <div key={i} id={cat.category} className="mb-10">
              <h2 className="text-2xl font-bold text-orange-500 mb-4">
                {cat.category}
              </h2>

              <div className="grid grid-cols-3 gap-6">
                {cat.items.map(item => (
                  <div
                    key={item._id}
                    className="bg-white p-4 shadow rounded cursor-pointer relative"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img
                      src={item.image}
                      className="h-40 w-full object-cover rounded"
                    />

                    {!item.inStock && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                        Out of Stock
                      </div>
                    )}

                    {/* ✅ FIXED BUTTON POSITION */}
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-orange-500 font-semibold">
                          ₹{item.price}
                        </p>
                      </div>

                      {(role === "chef" || role === "admin") && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStock(item._id);
                          }}
                          className={`px-3 py-1 text-sm rounded text-white ${
                            item.inStock
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {item.inStock ? "In" : "Out"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedItem.image}
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-3">
              {selectedItem.name}
            </h2>

            <p className="text-orange-500 font-bold">
              ₹{selectedItem.price}
            </p>

            {!selectedItem.inStock && (
              <p className="text-red-500 font-bold mt-2">
                Currently Out of Stock
              </p>
            )}

            {(role === "chef" || role === "admin") && (
              <button
                onClick={() => toggleStock(selectedItem._id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
              >
                Toggle Stock
              </button>
            )}

            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}