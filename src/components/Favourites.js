import { useEffect, useState } from "react";
import Recipe from "./Recipe";

function Favourites() {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!user) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:5000/favorites/${user.id}`
      );

      const data = await response.json();

      // If backend returns an error
      if (!response.ok || data.success === false) {
        console.log(data.message);
        setSavedItems([]);
        return;
      }

      // Ensure response is an array
      if (!Array.isArray(data)) {
        setSavedItems([]);
        return;
      }

      const favourites = data.map((item) => ({
        id: item.recipeId,
        title: item.recipeName,
        image_url: item.imageUrl,
        publisher: "CookBuddy",
      }));

      setSavedItems(favourites);

      localStorage.setItem(
        "recipes",
        JSON.stringify(favourites)
      );

    } catch (error) {
      console.error("Error loading favorites:", error);
      setSavedItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-orange-500">
          Loading Favorites...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8">

      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">
        ❤️ My Favourite Recipes
      </h1>

      {savedItems.length === 0 ? (
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-600">
            No favourite recipes found.
          </h2>

          <p className="text-gray-500 mt-3">
            Add recipes to your favourites to see them here.
          </p>
        </div>
      ) : (
        <div className="container mx-auto flex flex-wrap justify-center gap-8 px-4">
          {savedItems.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Favourites;