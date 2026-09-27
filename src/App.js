import { useEffect, useRef, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useSmoothScroll } from "./hooks/useSmoothScroll";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RecipeItem from "./components/RecipeItem";
import Favourites from "./components/Favourites";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

const App = () => {
  useSmoothScroll();

  const navigate = useNavigate();
  const location = useLocation();
  const searchField = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [savedItems, setSavedItems] = useState([]);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/register";

  // ================= LOAD FAVORITES =================

  const loadFavorites = async () => {
    if (!loggedInUser) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/favorites/${loggedInUser.id}`
      );

      const data = await response.json();

      const favorites = data.map((item) => ({
        id: item.recipeId,
        title: item.recipeName,
        image_url: item.imageUrl,
      }));

      setSavedItems(favorites);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [loggedInUser]);

  // ================= SEARCH =================

  const searchHandler = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    await getData(searchQuery);

    navigate("/home");

    searchField.current?.blur();

    setSearchQuery("");
  };

  // ================= GET RECIPES =================

  const getData = async (query) => {
    try {
      setLoading(true);
      setError("");

      let searchText = query.trim().toLowerCase();

      const categoryMap = {
        "north indian": "paneer",
        "south indian": "dosa",
        desserts: "cake",
        dessert: "cake",
        "fast food": "burger",
        italian: "pasta",
        chinese: "noodles",
        drinks: "juice",
        breakfast: "omelette",
        snacks: "sandwich",
        biryani: "biryani",
        pizza: "pizza",
        chicken: "chicken",
        veg: "vegetable",
      };

      searchText = categoryMap[searchText] || searchText;

      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(
          searchText
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      if (!data.data.recipes.length) {
        throw new Error("No recipes found");
      }

      setRecipes(data.data.recipes);
    } catch (err) {
      setRecipes([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= FAVORITES =================

  const favouriteHadler = async (id) => {
    try {
      if (!loggedInUser) {
        alert("Please login first");
        return;
      }

      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );

      const data = await res.json();

      const recipe = data.data.recipe;

      const exists = savedItems.some(
        (item) => item.id === recipe.id
      );

      if (exists) {
        await fetch(
          `http://127.0.0.1:5000/favorites/${loggedInUser.id}/${recipe.id}`,
          {
            method: "DELETE",
          }
        );

        await loadFavorites();

        alert("Removed from Favorites");
      } else {
        const response = await fetch(
          "http://127.0.0.1:5000/favorites",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: loggedInUser.id,
              recipeId: recipe.id,
              recipeName: recipe.title,
              imageUrl: recipe.image_url,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          await loadFavorites();

          alert("Added to Favorites");
        } else {
          alert(result.message);
        }
      }

      navigate("/favourites");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-orange-50">
        {!hideLayout && loggedInUser && (
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchField={searchField}
            searchHandler={searchHandler}
            savedItems={savedItems}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/register"
            element={
              loggedInUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Register />
              )
            }
          />

          <Route
            path="/home"
            element={
              loggedInUser ? (
                <Home
                  recipes={recipes}
                  loading={loading}
                  error={error}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              loggedInUser ? (
                <Profile />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/favourites"
            element={
              loggedInUser ? (
                <Favourites savedItems={savedItems} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/recipe-item/:id"
            element={
              loggedInUser ? (
                <RecipeItem
                  favouriteHadler={favouriteHadler}
                  savedItems={savedItems}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>

      {!hideLayout && loggedInUser && <Footer />}
    </>
  );
};

export default App;