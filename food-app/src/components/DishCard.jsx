export default function DishCard({ dish }) {
  return (
    <div className="bg-white rounded-xl shadow hover:scale-105 transition">
      <img src={dish.image} className="rounded-t-xl h-40 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-semibold">{dish.name}</h2>
        <p className="text-orange-500">₹{dish.price}</p>
      </div>
    </div>
  );
}