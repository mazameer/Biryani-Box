import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    }
  };

  return (
    <nav className="bg-black text-white px-10 py-5 flex items-center justify-between sticky top-0 z-50">

      {/* LEFT - LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-orange-500 cursor-pointer"
      >
        Biryani Box
      </h1>

      {/* RIGHT SIDE (MENU + BUTTON) */}
      <div className="flex items-center gap-8">

        <button onClick={() => scrollTo("home")} className="hover:text-orange-400">
          Home
        </button>

        <button onClick={() => scrollTo("menu")} className="hover:text-orange-400">
          Menu
        </button>

        <button onClick={() => navigate("/login")} className="hover:text-orange-400">
          Login
        </button>

        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600"
        >
          Order Online
        </button>

      </div>
    </nav>
  );
}