import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";
import OmoriPoster from "/src/assets/posters/post_omori.jpg"; // Import your image
import HiFiPoster from "/src/assets/posters/post_hifi_rush.jpg"; 
import HadesPoster from "/src/assets/posters/post_hades.jpg"; 
import MetaphorPoster from "/src/assets/posters/post_metaphor.png"; 
import GOWPoster from "/src/assets/posters/post_godofwar.jpg";
import P3RPoster from "/src/assets/posters/post_persona3r.jpg"; 
import CupheadPoster from "/src/assets/posters/post_cuphead.jpg"; 



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

  const Games = () => {
    return (
      <section className="py-10 bg-primary text-white font-sans">
      <div className="container">
          <h1 className="text-3xl font-bold mb-6">Popular Games</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  </section>
    );
};

export default Games;