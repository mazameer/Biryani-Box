import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-xl font-bold text-orange-500">Biryani Box</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
      </div>

      <div className="flex gap-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Order Online
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border px-4 py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}