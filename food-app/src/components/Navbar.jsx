export default function Navbar() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="bg-black text-white px-10 py-5 flex justify-between items-center sticky top-0 z-50">

      <h1 className="text-2xl font-bold text-orange-500">
        Biryani Box
      </h1>

      <div className="flex gap-10 text-gray-300">
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("menu")}>Menu</button>
      </div>

      <button className="bg-orange-500 px-5 py-2 rounded-lg">
        Order Online
      </button>

    </nav>
  );
}