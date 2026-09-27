import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaSearch,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(data.user)
        );

        alert(`Welcome ${data.user.name}!`);

        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Unable to connect to the Flask server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative z-10 w-11/12 max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-orange-600 to-red-600 text-white p-12">

          <h1 className="text-6xl font-extrabold mb-5">
            🍳 CookBuddy
          </h1>

          <p className="text-xl mb-10">
            Your Smart Recipe Finder
          </p>

          <div className="space-y-6 text-lg">

            <div className="flex items-center gap-4">
              <FaSearch className="text-2xl" />
              Search thousands of recipes instantly
            </div>

            <div className="flex items-center gap-4">
              <FaHeart className="text-2xl" />
              Save favourite recipes
            </div>

            <div className="flex items-center gap-4">
              <FaUtensils className="text-2xl" />
              Explore recipes by category
            </div>

            <div className="flex items-center gap-4">
              <FaUserCircle className="text-2xl" />
              Manage your profile
            </div>

          </div>

          <p className="mt-12 text-orange-100">
            Discover delicious recipes from around the world.
          </p>

        </div>

        {/* Right Side */}
        <div className="bg-white/95 p-10 flex flex-col justify-center">

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">
              🍳
            </div>

            <h2 className="text-4xl font-bold text-orange-600">
              Welcome Back
            </h2>

            <p className="text-gray-600 mt-2">
              Login to continue your cooking journey
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="📧 Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            <input
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white text-lg font-bold transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105"
              }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-8">

            <p className="text-gray-700">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="text-orange-600 font-bold hover:underline"
            >
              Register Here
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;