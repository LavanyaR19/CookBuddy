import FryingPan from "./FryingPan";
import Recipe from "./Recipe";
import { ImSpinner9 } from "react-icons/im";

const Home = ({ recipes, loading, error }) => {
  const categories = [
    "🍛 South Indian",
    "🥘 North Indian",
    "🍕 Snacks",
    "🍰 Desserts",
    "🥗 Healthy",
    "🥤 Drinks",
  ];

  return (
    <div className="bg-orange-50 min-h-screen">

      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-5">
          <h1 className="text-6xl font-bold mb-5">
            🍳 CookBuddy
          </h1>

          <p className="text-2xl mb-8">
            Discover Delicious Recipes From Around The World
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full text-lg font-bold duration-300">
            Explore Recipes
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-14 px-5">

        <h2 className="text-4xl font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl shadow-lg p-6 text-center hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
            >
              <h3 className="text-lg font-bold">{item}</h3>

              <p className="text-gray-500 mt-2">
                25+ Recipes
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Recipes */}
      <section className="container mx-auto px-5 py-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          Trending Recipes
        </h2>

        <div className="flex flex-wrap justify-center gap-8">

          {!loading && !error && recipes.length === 0 && (
            <div className="text-center">

              <h2 className="text-3xl font-bold text-orange-500 mb-4">
                Search Your Favourite Recipe 🍽️
              </h2>

              <p className="text-gray-600 mb-6">
                Find thousands of delicious recipes instantly.
              </p>

              <FryingPan />

            </div>
          )}

          {loading && (
            <ImSpinner9 className="animate-spin text-5xl text-orange-500" />
          )}

          {error && (
            <h2 className="text-red-500 text-2xl">
              {error}
            </h2>
          )}

          {recipes?.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20">

        <div className="container mx-auto px-5">

          <h2 className="text-5xl font-bold text-center mb-4">
            Why Choose CookBuddy?
          </h2>

          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need to cook delicious meals at home.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl duration-300">
              <div className="text-6xl mb-5">🍽️</div>

              <h3 className="text-2xl font-bold mb-3">
                100+ Recipes
              </h3>

              <p className="text-gray-600">
                Explore tasty North Indian, South Indian,
                Snacks, Desserts and Healthy recipes.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl duration-300">
              <div className="text-6xl mb-5">⚡</div>

              <h3 className="text-2xl font-bold mb-3">
                Smart Search
              </h3>

              <p className="text-gray-600">
                Search recipes instantly by recipe name or ingredients.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl duration-300">
              <div className="text-6xl mb-5">❤️</div>

              <h3 className="text-2xl font-bold mb-3">
                Save Favorites
              </h3>

              <p className="text-gray-600">
                Save recipes and cook your favourite dishes anytime.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;