import React from "react";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";

const gamesData = [
    {
      id: 1,
      title: "Game Title",
      image: "https://via.placeholder.com/150",
      //image: Game1,
      followers: 30,
    },
    {
      id: 2,
      title: "Game Title",
      image: "https://via.placeholder.com/150",
      //image: Game2,
      followers: 35,
    },
    {
      id: 3,
      title: "Game Title2",
      image: "https://via.placeholder.com/150",
      //image: Game3,
      followers: 35,
    },
    {
      id: 4,
      title: "Game Title3",
      image: "https://via.placeholder.com/150",
      //image: Game1,
      followers: 35,
    },
    {
      id: 5,
      title: "Game Title4",
      image: "https://via.placeholder.com/150",
      //image: Game2,
      followers: 35,
    },
    {
      id: 6,
      title: "Game Title5",
      image: "https://via.placeholder.com/150",
      //image: Game3,
      followers: 55,
    },
  ];

  const Games = () => {

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

    return (
        <section className="py-10 bg-primary text-white">
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Popular Games</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gamesData.map((game) => (
                    <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden relative">
                    <img 
                        src={game.image} 
                        alt={game.title} 
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay for title and followers */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <h3 className="font-semibold text-white">{game.title}</h3>
                        <p className="text-gray-400">{game.followers} followers</p>
                    </div>
                    </div>
                ))}
                </div>
                
            </div>
        </section>
    );
};

export default Games;