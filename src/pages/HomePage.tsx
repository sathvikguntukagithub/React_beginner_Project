import { useEffect, useState } from "react";
import ReceipeCards from "../components/ReceipeCards";
import { cuisines } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (you can use localStorage or context)
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleOnClick = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  return (
    <>
      <div className="mt-4 flex justify-start gap-3">
        {cuisines.map((cuisine, id) => (
          <span
            onClick={() => handleOnClick(cuisine)}
            key={`${cuisine}-${id}`}
            className="inline-flex cursor-pointer items-center rounded-md bg-amber-400 px-3 py-2 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-yellow-500/20 hover:underline decoration-2 hover:font-bold hover:transition duration-300 ease-in-out"
          >
            {cuisine}
          </span>
        ))}
      </div>
      <ReceipeCards selectedCuisine={selectedCuisine} />
    </>
  );
};
