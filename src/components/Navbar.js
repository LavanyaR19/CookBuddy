import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaHome,
  FaUtensils,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = ({
  searchHandler,
  searchQuery,
  setSearchQuery,
  searchField,
  savedItems,
}) => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // ================= LOGOUT =================

  const logoutHandler = async () => {
    try {
      if (loggedInUser) {
        const response = await fetch(
          "http://127.0.0.1:5000/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: loggedInUser.id,
            }),
          }
        );

        const result = await response.json();

        console.log(result.message);
      }
    } catch (error) {
      console.log("Logout API Error:", error);
    } finally {
      localStorage.removeItem("loggedInUser");

      alert("Logged out successfully!");

      navigate("/", { replace: true });
    }
  };

  const navStyle = ({ isActive }) => ({
    color: isActive ? "#f97316" : "#444",
    fontWeight: isActive ? "700" : "500",
    transition: "0.3s",
  });

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6 py-4 gap-5">

        {/* ================= LOGO ================= */}

        <NavLink
          to="/home"
          className="flex items-center gap-3"
        >
          <div className="bg-orange-500 text-white p-3 rounded-full shadow-md text-xl">
            🍳
          </div>

          <div>
            <h1 className="text-3xl font-extrabold">
              <span className="text-orange-500">Cook</span>
              <span className="text-red-500">Buddy</span>
            </h1>

            <p className="text-xs text-gray-500">
              Smart Recipe Finder
            </p>
          </div>
        </NavLink>

        {/* ================= SEARCH ================= */}

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-gray-100 rounded-full px-5 py-3 w-full lg:w-[420px] shadow"
        >
          <FaSearch className="text-orange-500 mr-3" />

          <input
            ref={searchField}
            type="search"
            placeholder="Search recipes, categories..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="bg-transparent outline-none w-full"
            required
          />
        </form>

        {/* ================= MENU ================= */}

        <ul className="flex items-center gap-6 text-lg font-semibold">

          <li>
            <NavLink
              to="/home"
              style={navStyle}
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <FaHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/home"
              style={navStyle}
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <FaUtensils />
              Recipes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favourites"
              style={navStyle}
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <FaHeart className="text-red-500" />

              Favorites

              <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                {savedItems.length}
              </span>
            </NavLink>
          </li>

          {/* ================= PROFILE ================= */}

          <li>
            <NavLink
              to="/profile"
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <FaUserCircle className="text-3xl text-orange-500" />

              <span className="hidden md:block font-medium">
                {loggedInUser?.name}
              </span>
            </NavLink>
          </li>

          {/* ================= LOGOUT ================= */}

          <li>
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>

        </ul>

      </div>
    </nav>
  );
};

export default Navbar;