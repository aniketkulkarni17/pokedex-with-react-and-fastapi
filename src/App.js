import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ErrorPage from "./components/ErrorPage";
import Pokedex from "./components/Pokedex";
import Favourites from "./components/Favourites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
