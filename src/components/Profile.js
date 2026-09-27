import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaHeart,
  FaIdBadge,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaSmile,
  FaFire,
} from "react-icons/fa";

const Profile = () => {
  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      if (!user.id) return;

      const response = await fetch(
        `http://127.0.0.1:5000/favorites/${user.id}`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setFavoriteCount(data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Current Date
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Current Time
  const currentTime = new Date().toLocaleTimeString("en-IN");

  // Registered Date
  let joinedDate = "Not Available";

  if (
    user.registeredAt &&
    user.registeredAt !== "None" &&
    user.registeredAt !== "null"
  ) {
    joinedDate = new Date(user.registeredAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Cover */}

        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 h-44"></div>

        {/* Profile */}

        <div className="-mt-16 flex flex-col items-center">

          <FaUserCircle className="text-[120px] text-orange-500 bg-white rounded-full shadow-xl p-2" />

          <h1 className="text-4xl font-bold mt-4">
            {user.name || "Guest User"}
          </h1>

          <p className="flex items-center gap-2 text-gray-600 mt-2">
            <FaEnvelope />
            {user.email || "No Email"}
          </p>

          <div className="mt-4 px-5 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold">
            👋 Welcome to CookBuddy
          </div>

        </div>

        {/* Cards */}

        <div className="p-8">

          <h2 className="text-3xl text-center font-bold text-orange-500 mb-8">
            My Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* User ID */}

            <div className="bg-orange-50 rounded-xl p-5 shadow hover:scale-105 duration-300 flex gap-4 items-center">

              <FaIdBadge className="text-4xl text-orange-500" />

              <div>

                <p className="text-gray-500">
                  User ID
                </p>

                <h3 className="text-2xl font-bold">
                  {user.id}
                </h3>

              </div>

            </div>

            {/* Member Since */}

            <div className="bg-orange-50 rounded-xl p-5 shadow hover:scale-105 duration-300 flex gap-4 items-center">

              <FaCalendarAlt className="text-4xl text-green-600" />

              <div>

                <p className="text-gray-500">
                  Member Since
                </p>

                <h3 className="font-bold">
                  {joinedDate}
                </h3>

              </div>

            </div>

            {/* Today's Date */}

            <div className="bg-orange-50 rounded-xl p-5 shadow hover:scale-105 duration-300 flex gap-4 items-center">

              <FaClock className="text-4xl text-blue-600" />

              <div>

                <p className="text-gray-500">
                  Today's Date
                </p>

                <h3 className="font-bold">
                  {today}
                </h3>

              </div>

            </div>

            {/* Current Time */}

            <div className="bg-orange-50 rounded-xl p-5 shadow hover:scale-105 duration-300 flex gap-4 items-center">

              <FaClock className="text-4xl text-purple-600" />

              <div>

                <p className="text-gray-500">
                  Current Time
                </p>

                <h3 className="font-bold">
                  {currentTime}
                </h3>

              </div>

            </div>

            {/* Favorites */}

            <div className="bg-orange-50 rounded-xl p-5 shadow hover:scale-105 duration-300 flex gap-4 items-center">

              <FaHeart className="text-4xl text-red-500" />

              <div>

                <p className="text-gray-500">
                  Favorite Recipes
                </p>

                <h3 className="text-2xl font-bold">
                  {favoriteCount}
                </h3>

              </div>

            </div>

            {/* Status */}

            <div className="bg-orange-50 rounded-xl p-5 shadow hover:scale-105 duration-300 flex gap-4 items-center">

              <FaCheckCircle className="text-4xl text-green-500" />

              <div>

                <p className="text-gray-500">
                  Status
                </p>

                <h3 className="text-green-600 font-bold">
                  Active
                </h3>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 text-center shadow-lg">

            <FaFire className="mx-auto text-4xl mb-3" />

            <h2 className="text-2xl font-bold">
              Keep Exploring New Recipes!
            </h2>

            <p className="mt-2">
              Thank you for being a part of the CookBuddy family.
              Save your favorite recipes and enjoy cooking every day.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;