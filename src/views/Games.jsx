import React, { useState } from "react";
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
  { id: 1, title: "Omori", image: OmoriPoster, rating: 4.5 },
  { id: 2, title: "Hi-Fi Rush", image: HiFiPoster, rating: 5 }, 
  { id: 3, title: "Hades", image: HadesPoster, rating: 5 }, 
  { id: 4, title: "Metaphor: Re-Fantazio", image: MetaphorPoster, rating: 3 }, 
  { id: 5, title: "God of War", image: GOWPoster, rating: 4 }, 
  { id: 6, title: "Cuphead", image: CupheadPoster, rating: 3 }, 
];

const Games = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5; // Number of games to display per page

  // Calculate the index of the last game on the current page
  const indexOfLastGame = currentPage * gamesPerPage;
  // Calculate the index of the first game on the current page
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  // Get the games for the current page
  const currentGames = GameCardData.slice(indexOfFirstGame, indexOfLastGame);

  // Calculate total pages
  const totalPages = Math.ceil(GameCardData.length / gamesPerPage);

  return (
    <section className="py-10 bg-primary text-white font-sans">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Popular Games</h1>

        {/* Large screen grid layout (1024px and above) */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {currentGames.map((game) => (
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

        {/* Small and Extra Small screen list layout (below 1024px and 640px) */}
        <div className="lg:hidden">
          {currentGames.map((game) => (
            <div key={game.id} className="flex flex-col sm:flex-row bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img src={game.image} alt={game.title} className="w-full sm:w-24 h-24 object-cover" />
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold text-white">{game.title}</h3>
                <div className="flex">{renderStars(game.rating)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-primary border border-yellowish text-white hover:bg-yellowish hover:text-black px-4 py-2 cursor-pointer rounded-md"
          >
            Previous
          </button>
          {/* Page Number Buttons */}
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-yellowish text-black" : "bg-primary text-white hover:bg-yellowish hover:text-black"}`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-primary border border-yellowish text-white hover:bg-yellowish hover:text-black px-4 py-2 cursor-pointer rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Games;
