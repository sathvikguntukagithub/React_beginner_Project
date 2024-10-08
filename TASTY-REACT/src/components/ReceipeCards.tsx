import React, { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { Data, Recipe } from "../types";
import Loading from "./Loading";
import { Link } from "react-router-dom";

interface ReceipeCardsProps {
  selectedCuisine: string;
}

const ReceipeCards = ({ selectedCuisine }: ReceipeCardsProps) => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const { data, loading, error } = useFetchData<Data>("recipes", "get");

  useEffect(() => {
    if (selectedCuisine) {
      if (selectedCuisine === "All") {
        return setFilteredRecipes(data?.recipes || []);
      }
      const recipes = data?.recipes.filter(
        (receipe) => receipe.cuisine === selectedCuisine
      );
      setFilteredRecipes(recipes || []);
    } else {
      setFilteredRecipes(data?.recipes || []);
    }
  }, [data, selectedCuisine]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 mt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
          {filteredRecipes?.map((item: Recipe) => (
            <Link to={`/ReceipePage/${item.id}`}>
              <div
                className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer bg-gradient-to-r from-green-300 to-yellow-300"
                key={item.id}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg p-2"
                  src={item.image}
                  alt={item.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-purple-600">
                    {item.name}
                  </div>
                  <p className="text-gray-700 text-base mb-2">
                    Cuisine:{" "}
                    <span className="text-blue-600">{item.cuisine}</span>
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    Prep Time:{" "}
                    <span className="text-green-600">
                      {item.prepTimeMinutes}
                    </span>
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    Cook Time:{" "}
                    <span className="text-green-600">
                      {item.cookTimeMinutes}
                    </span>
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    Servings:{" "}
                    <span className="text-yellow-600">{item.servings}</span>
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    Rating:{" "}
                    <span className="text-yellow-600">{item.rating}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* Add more cards here */}
        </div>
      </div>
    </>
  );
};

export default React.memo(ReceipeCards);
