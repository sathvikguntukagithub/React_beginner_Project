import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/Loading";
import { RecipeFetchState } from "../types";
import { FaStar } from "react-icons/fa";

const ReceipePage = () => {
  const { recipeId } = useParams();
  const { data, loading, error }: RecipeFetchState = useFetchData(
    `recipes/${recipeId}`,
    "get"
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-8">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-orange-600 font-semibold text-lg">
            &larr; Back to all Recipes
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
        </div>

        {/* Recipe Image */}
        <div className="relative w-full h-64 mb-6">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Recipe Details */}
        <div className="flex flex-wrap justify-between items-center bg-orange-100 p-4 rounded-md mb-6">
          <p className="text-gray-700">
            <strong>Cuisine:</strong> {data.cuisine}
          </p>
          <p className="text-gray-700">
            <strong>Difficulty:</strong> {data.difficulty}
          </p>
          <p className="text-gray-700">
            <strong>Cook Time:</strong> {data.cookTimeMinutes} mins
          </p>
          <p className="text-gray-700">
            <strong>Servings:</strong> {data.servings}
          </p>
          <p className="flex items-center text-gray-700">
            <strong>Rating:</strong>
            <span className="flex items-center ml-2">
              {[...Array(Math.round(data.rating))].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </span>
            <span className="ml-2 text-sm">({data.reviewCount} reviews)</span>
          </p>
        </div>

        {/* Ingredients Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Ingredients
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {data.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Instructions
          </h2>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            {data.instructions.map((step: string, index: number) => (
              <li key={index} className="border-l-4 border-orange-400 pl-3">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ReceipePage;
