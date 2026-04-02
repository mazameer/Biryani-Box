export default function Hero() {
  return (
    <div className="h-[70vh] bg-cover bg-center flex items-center px-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1600')",
      }}
    >
      <div className="bg-black/60 p-8 rounded-xl text-white max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Experience Authentic Indian Flavors
        </h1>

        <p className="mt-4 text-gray-200">
          Delicious food, delivered fresh and hot to your doorstep.
        </p>

        <button className="mt-6 bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600">
          Order Now
        </button>
      </div>
    </div>
  );
}