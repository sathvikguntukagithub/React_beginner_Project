import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-black p-2 rounded">
      <h1 className="text-white text-3xl">
        <Link to={"/"}>Tasty React</Link>
      </h1>
    </nav>
  );
};
