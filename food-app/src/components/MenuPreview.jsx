import { useNavigate } from "react-router-dom";
import menuData from "../data/dishes";

export default function MenuPreview() {
  const navigate = useNavigate();

  // 🔥 Get first 6 items from ALL categories
  const previewItems = menuData.flatMap(cat => cat.items).slice(0, 6);

  return (
    <div className="px-10 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured</h2>

        <button
          onClick={() => navigate("/menu")}
          className="text-orange-500 font-semibold hover:underline"
        >
          View More →
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {previewItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-orange-500 font-bold">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}