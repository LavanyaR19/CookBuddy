import { Link } from "react-router-dom";
import { FaHeart, FaClock, FaUtensils } from "react-icons/fa";

const Recipe = ({ recipe }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-80">

      {/* Recipe Image */}

      <div className="relative">

        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-56 object-cover"
        />

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white duration-300">
          <FaHeart />
        </button>

      </div>

      {/* Recipe Content */}

      <div className="p-5">

        <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
          {recipe.publisher}
        </span>

        <h2 className="text-2xl font-bold mt-2 mb-4 line-clamp-2">
          {recipe.title}
        </h2>

        <div className="flex justify-between items-center text-gray-500 text-sm mb-5">

          <div className="flex items-center gap-2">
            <FaClock className="text-orange-500" />
            <span>30 mins</span>
          </div>

          <div className="flex items-center gap-2">
            ⭐ 4.8
          </div>

        </div>

        <Link
          to={`/recipe-item/${recipe.id}`}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:scale-105 duration-300"
        >
          <FaUtensils />
          View Recipe
        </Link>

      </div>

    </div>
  );
};

export default Recipe;