import React from "react";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";
import OmoriPoster from "/src/assets/posters/post_omori.jpg"; // Import your image
import HiFiPoster from "/src/assets/posters/post_hifi_rush.jpg"; 
import HadesPoster from "/src/assets/posters/post_hades.jpg"; 
import MetaphorPoster from "/src/assets/posters/post_metaphor.png"; 
import GOWPoster from "/src/assets/posters/post_godofwar.jpg";
import P3RPoster from "/src/assets/posters/post_persona3r.jpg"; 
import CupheadPoster from "/src/assets/posters/post_cuphead.jpg"; 

const bgImage = {
    backgroundImage: 'url("/src/assets/hero/persona3r_banner.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "400px",
  width: "100%",
  backgroundColor: "black",
};

const bgSquare = {
  width: "450px",
  height: "250px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  marginTop: "1rem",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "left",
  padding: "20px",
};

const game1Cover = {
  backgroundImage: 'url("/src/assets/game/game1.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "350px",
};

const game2Cover = {
    backgroundImage: 'url("/src/assets/game/game2.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
};

const game3Cover = {
    backgroundImage: 'url("/src/assets/game/game3.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaRegStarHalf key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return stars;
}

const GameCardData = [
  { id: 1, title: "Omori", image: OmoriPoster, rating: 4.5 }, // Use imported image
  { id: 2, title: "Hi-Fi Rush", image: HiFiPoster, rating: 5 }, 
  { id: 3, title: "Hades", image: HadesPoster, rating: 5 }, 
  { id: 4, title: "Metaphor: Re-Fantazio", image: MetaphorPoster, rating: 3 }, 
  { id: 5, title: "God of War", image: GOWPoster, rating: 4 }, 
  { id: 6, title: "Cuphead", image: CupheadPoster, rating: 3 }, 
];

const Hero = () => (
  <div className="bg-primary container">
    <div style={bgImage} className="bg-primary min-h-[600px] flex items-center">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div style={bgSquare}>
            <div>
              <p className="text-lg text-yellow-500 font-semibold">Discover Games, Remember Them Forever</p>
              <h1 className="text-5xl font-bold text-white">Read About Games That You Enjoy</h1>
              <button className="mt-8 bg-yellow-500 inline-block px-6 py-3 rounded-2xl font-semibold">Start Exploring</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TrendingGames = () => (
  <section className="py-10 bg-primary text-white">
    <div className="container relative">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Currently Trending Games</h1>
        <button className="bg-gray-400/50 text-white inline-block px-4 py-2 rounded-xl font-semibold">View All</button>
      </div>
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-8">

          {GameCardData.map((game) => (
              <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden relative">
              <Link to="/gamesdetails">
              <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <h3 className="font-semibold text-white">{game.title}</h3>
                  <div className="flex">{renderStars(game.rating)}</div>
              </div>
              </Link>
              </div>
          ))}
          
        </div>
      </div>
    </div>
  </section>
);

const RecommendedArticles = () => (
  <section className="py-10 bg-primary text-white">
    <div className="container relative">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Recommended Articles</h1>
        <button className="bg-gray-400/50 text-white inline-block px-4 py-2 rounded-xl font-semibold">View All</button>
      </div>
      <div className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-4 mt-8">
          <div style={game1Cover} className="row-span-1 sm:row-span-2 sm:col-span-2 bg-red-400 h-[350px] rounded-xl relative">
            <div className="bg-black/20 h-full w-full">
              <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-4 bg-gradient-to-t from-primary to-transparent">
                <img src='url("/src/assets/game/game1.jpg")' alt="" className="h-[140px] min-w-[110px] object-cover rounded-xl" />
                <div>
                  <h1 className="font-semibold text-xl">Lorem ipsum dolor sit, amet consectetur</h1>
                  <p className="text-sm text-white/80">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
            </div>
          </div>
          <div style={game2Cover} className="sm:row-span-1 bg-orange-400 rounded-xl relative">
            <div className="bg-black/20 h-full w-full">
              <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-4 bg-gradient-to-t from-primary to-transparent">
                <img src='url("/src/assets/game/game2.jpg")' alt="" className="h-[80px] min-w-[60px] object-cover rounded-xl" />
                <h1 className="font-semibold text-xl">Lorem ipsum dolor sit, amet consectetur</h1>
              </div>
            </div>
          </div>
          <div style={game3Cover} className="sm:row-span-1 bg-blue-500 rounded-xl relative">
            <div className="bg-black/20 h-full w-full">
              <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-4 bg-gradient-to-t from-primary to-transparent">
                <img src='url("/src/assets/game/game3.jpg")' alt="" className="h-[80px] min-w-[60px] object-cover rounded-xl" />
                <h1 className="font-semibold text-xl">Lorem ipsum dolor sit, amet consectetur</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LandingPage = () => (
  <div>
    <Hero />
    <TrendingGames />
    <RecommendedArticles />
  </div>
);

export default LandingPage;