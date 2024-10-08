import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/Loading";
import { RecipeFetchState } from "../types";

const ReceipePage = () => {
  const { recipeId } = useParams();

  const { data, loading, error }: RecipeFetchState = useFetchData(
    `recipes/${recipeId}`,
    "get"
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  return (
    <>
      {loading && <Loading />}
      <div className="bg-gradient-to-r from-green-300 to-yellow-300">
        <div className="container mx-auto">
          <div className="flex justify-center gap-32">
            <Link to={"/"}>&lArr; Back to all Recipes</Link>
            <h1 className="text-black font-bold text-3xl">{data.name}</h1>
            <img src={data.image} alt="" className="h-48" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceipePage;
