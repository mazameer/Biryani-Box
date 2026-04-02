import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token || "dummy");
      localStorage.setItem("role", role);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">

      {/* 🔥 BIGGER CARD */}
      <div className="bg-white p-14 rounded-3xl shadow-2xl w-[500px]">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Login
        </h2>

        {/* ROLE BUTTONS */}
        <div className="flex gap-3 mb-8">
          {["admin", "chef", "staff"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition 
                ${
                  role === r
                    ? "bg-orange-500 text-white scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 mb-5 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 mb-8 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold transition"
        >
          Login as {role.toUpperCase()}
        </button>

      </div>
    </div>
  );
}