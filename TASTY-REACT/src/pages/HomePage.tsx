import { useState } from "react";
import ReceipeCards from "../components/ReceipeCards";
import { cuisines } from "../utils/constants";

export const HomePage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("");

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
            className="inline-flex cursor-pointer items-center rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-yellow-500/20"
          >
            {cuisine}
          </span>
        ))}
      </div>
      <ReceipeCards selectedCuisine={selectedCuisine} />
    </>
  );
};
