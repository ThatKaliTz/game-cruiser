import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavFoot from "./NavFoot.jsx";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Hero from "./components/Hero/Hero.jsx";
// import TrendingGames from "./components/TrendingGames/TrendingGames.jsx";
// import RecommendedArticles from "./components/RecommendedArticles/RecommendedArticles.jsx";
import Games from "./views/Games.jsx";
import User from "./views/User.jsx";
import LandingPage from "./views/LandingPage.jsx";

const App = () => {
  return (
    <Router>
      <NavFoot>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/trending" element={<TrendingGames />} />
            <Route path="/articles" element={<RecommendedArticles />} /> */}
            <Route path="/games" element={<Games />} /> {/* Add new route here */}
            <Route path="/user" element={<User />} />
          </Routes>
      </NavFoot>
    </Router>
  );
}

export default App;


