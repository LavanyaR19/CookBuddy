import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

import { BsPerson, BsClock } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { ImSpinner9 } from "react-icons/im";

const RecipeItem = ({ favouriteHadler, savedItems }) => {
  const [itemSavedStatus, setItemSavedStatus] = useState(false);

  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(id);

  const durationCalc = (duration) => {
    if (!duration) return "";

    if (!String(duration).includes(".")) return duration + " hr";

    const split = String(duration).split(".");
    const hour = split[0] + " hr ";
    const min = "." + split[1];

    return hour + parseInt(+min * 60) + " min";
  };

  useEffect(() => {
    if (!recipe) return;

    setItemSavedStatus(savedItems.some((item) => item.id === recipe.id));
  }, [recipe, savedItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-orange-50">
        <ImSpinner9 className="animate-spin text-6xl text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-orange-50">
        <h2 className="text-3xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-10">

      <div className="container mx-auto px-5">

        {/* Top Section */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Recipe Image */}

          <div>
            <img
              src={recipe?.image_url}
              alt={recipe?.title}
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </div>

          {/* Recipe Details */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <p className="uppercase text-orange-500 font-bold tracking-widest">
              {recipe?.publisher}
            </p>

            <h1 className="text-5xl font-bold mt-3 mb-6">
              {recipe?.title}
            </h1>

            <div className="flex flex-wrap gap-8 mb-8">

              <div className="flex items-center gap-2 text-lg">
                <BsPerson className="text-orange-500" />
                <span>{recipe?.servings} Servings</span>
              </div>

              <div className="flex items-center gap-2 text-lg">
                <BsClock className="text-orange-500" />
                <span>
                  {recipe?.cooking_time < 60
                    ? recipe?.cooking_time + " min"
                    : durationCalc(recipe?.cooking_time / 60)}
                </span>
              </div>

            </div>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => favouriteHadler(recipe?.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  itemSavedStatus
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {itemSavedStatus
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}
              </button>

              <a
                href={recipe?.source_url}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold"
              >
                View Full Recipe
              </a>

              <Link
                to="/"
                className="bg-gray-700 hover:bg-black transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold"
              >
                ← Back to Recipes
              </Link>

            </div>

          </div>

        </div>

        {/* Ingredients */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">

          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <GiKnifeFork className="text-orange-500" />
            Ingredients
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {recipe?.ingredients?.map((ing, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-orange-50 rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <TiTick className="text-green-500 text-2xl mt-1 flex-shrink-0" />

                <span className="text-lg">
                  {ing.quantity && `${ing.quantity} `}
                  {ing.unit && `${ing.unit} `}
                  {ing.description}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* Cooking Instructions */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">

          <h2 className="text-4xl font-bold text-orange-500 mb-6">
            👨‍🍳 Cooking Instructions
          </h2>

          <p className="text-gray-700 text-lg leading-8">
            This recipe has been carefully selected for you.
            Click the
            <span className="font-bold text-orange-500">
              {" "}View Full Recipe{" "}
            </span>
            button above to read the complete cooking instructions
            from the original source website.
          </p>

        </div>

      </div>

    </div>
  );
};

export default RecipeItem;