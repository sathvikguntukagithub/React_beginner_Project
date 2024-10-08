import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import ReceipePage from "./pages/ReceipePage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/ReceipePage/:recipeId" element={<ReceipePage />}></Route>
        <Route path="*" element={<p>This page does not exist</p>}></Route>
      </Routes>
    </>
  );
}

export default App;
