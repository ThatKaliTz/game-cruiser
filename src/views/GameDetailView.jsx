import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { gamesData } from './components/Games/GamesData.js';

const Games = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCardClick = (id) => {
        navigate(`/game/${id}`); // Navigate to GameDetailView with the game ID
    };

    return (
        <section className="py-10 bg-primary text-white">
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Popular Games</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gamesData.map((game) => (
                        <div
                            key={game.id}
                            className="bg-gray-800 rounded-lg p-4 cursor-pointer"
                            onClick={() => handleCardClick(game.id)} // Call handleCardClick on click
                        >
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full h-[200px] object-cover rounded-md"
                            />
                            <h2 className="text-lg font-semibold mt-2">{game.title}</h2>
                            <p className="text-yellow-400">Followers: {game.followers}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Games;