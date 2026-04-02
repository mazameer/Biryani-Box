import { useEffect, useState } from "react";

export default function MenuPreview() {
  const [menuData, setMenuData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
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

  const isOut = (item) => {
    if (!item.outUntil) return false;
    return new Date(item.outUntil) > new Date();
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
  };

  const setOut = (item, hrs) => {
    const t = new Date();
    t.setHours(t.getHours() + hrs);
    updateItem(item._id, t);
    resetDrawer();
  };

  const setCustom = (item) => {
    if (!customTime) return;
    updateItem(item._id, new Date(customTime));
    resetDrawer();
  };

  const resetDrawer = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
    setCustomMode(false);
    setCustomTime("");
  };

  return (
    <div className="flex bg-black text-white min-h-screen">

      {/* LEFT SIDEBAR */}
      <div className="w-1/5 border-r border-gray-800 p-6 sticky top-20 h-screen">
        <h2 className="text-xl mb-4">Categories</h2>

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
      <div className="w-4/5 p-8">

        <h1 className="text-4xl font-bold mb-10">
          Explore <span className="text-orange-500">Flavors</span>
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
                  className="bg-[#1a1a1a] rounded-xl p-4 hover:scale-105 transition"
                >
                  <img
                    src={item.image}
                    className="h-40 w-full object-cover rounded"
                  />

                  <h3 className="mt-3 font-bold">{item.name}</h3>

                  <p className="text-orange-400">₹{item.price}</p>

                  <p className="mt-2">
                    {isOut(item)
                      ? <span className="text-red-500">Unavailable</span>
                      : <span className="text-green-500">Available</span>}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setDrawerOpen(true);
                    }}
                    className="mt-3 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
                  >
                    Set Out of Stock
                  </button>

                </div>
              ))}

            </div>
          </div>
        ))}
      </div>

      {/* RIGHT DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#111] p-6 shadow-xl transform transition duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedItem && (
          <>
            <h2 className="text-xl font-bold mb-6">
              Set Out of Stock
            </h2>

            {/* TIME OPTIONS */}
            {!customMode && (
              <div className="flex flex-col gap-3">

                <button
                  onClick={() => setOut(selectedItem, 1)}
                  className="bg-gray-800 p-3 rounded hover:bg-gray-700"
                >
                  1 Hour
                </button>

                <button
                  onClick={() => setOut(selectedItem, 3)}
                  className="bg-gray-800 p-3 rounded hover:bg-gray-700"
                >
                  3 Hours
                </button>

                <button
                  onClick={() => setOut(selectedItem, 12)}
                  className="bg-gray-800 p-3 rounded hover:bg-gray-700"
                >
                  12 Hours
                </button>

                <button
                  onClick={() => setOut(selectedItem, 24)}
                  className="bg-gray-800 p-3 rounded hover:bg-gray-700"
                >
                  24 Hours
                </button>

                {/* CUSTOM BUTTON */}
                <button
                  onClick={() => setCustomMode(true)}
                  className="bg-orange-500 p-3 rounded hover:bg-orange-600"
                >
                  Custom Time
                </button>
              </div>
            )}

            {/* CUSTOM MODE */}
            {customMode && (
              <div className="mt-4">

                <input
                  type="datetime-local"
                  className="w-full p-2 bg-gray-800 rounded"
                  onChange={(e) => setCustomTime(e.target.value)}
                />

                <button
                  onClick={() => setCustom(selectedItem)}
                  className="mt-3 w-full bg-orange-500 py-2 rounded"
                >
                  Apply Custom Time
                </button>

                <button
                  onClick={() => setCustomMode(false)}
                  className="mt-2 w-full text-gray-400"
                >
                  Back
                </button>

              </div>
            )}

            {/* CLOSE BUTTON */}
            <button
              onClick={resetDrawer}
              className="mt-10 w-full border border-red-500 text-red-500 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              Close
            </button>

          </>
        )}
      </div>

    </div>
  );
}