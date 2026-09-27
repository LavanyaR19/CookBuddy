import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration Successful!");

        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
     style={{
  backgroundImage:
    "url('https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1920&auto=format&fit=crop')",
}}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mx-4">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🍳
          </div>

          <h1 className="text-5xl font-extrabold">
            <span className="text-orange-500">Cook</span>
            <span className="text-red-500">Buddy</span>
          </h1>

          <p className="text-gray-600 mt-3">
            Create your account and explore thousands of delicious recipes.
          </p>

        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={user.name}
            onChange={changeHandler}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={user.email}
            onChange={changeHandler}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={user.password}
            onChange={changeHandler}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="🔐 Confirm Password"
            value={user.confirmPassword}
            onChange={changeHandler}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            Register
          </button>

        </form>

        {/* Login */}
        <p className="text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-orange-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;