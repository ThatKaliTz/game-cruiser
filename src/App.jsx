import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavFoot from "./NavFoot.jsx";
import Games from "./views/Games.jsx";
import User from "./views/User.jsx";
import LandingPage from "./views/LandingPage.jsx";
import GameDetails from "./views/GamesDetail.jsx";
import FriendProfile from "./views/FriendProfile.jsx";

const App = () => {
  return (
    <Router>
      <NavFoot>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/trending" element={<TrendingGames />} />
            <Route path="/articles" element={<RecommendedArticles />} /> */}
            <Route path="/games" element={<Games />} /> {/* Add new route here */}
            <Route path="/gamesdetails" element={<GameDetails />} /> 

            <Route path="/friendprofile" element={<FriendProfile />} /> 
            <Route path="/friendprofile/profile" element={<FriendProfile />} />
            <Route path="/friendprofile/games" element={<FriendProfile />} />
            <Route path="/friendprofile/reviews" element={<FriendProfile />} />
            <Route path="/friendprofile/friends" element={<FriendProfile />} /> 

            <Route path="/user/profile" element={<User />} />
            <Route path="/user/games" element={<User />} />
            <Route path="/user/reviews" element={<User />} />
            <Route path="/user/friends" element={<User />} /> 
            
          </Routes>
      </NavFoot>
    </Router>
  );
}

export default App;


