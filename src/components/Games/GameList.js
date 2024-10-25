import React, { useState } from 'react';
import { gamesData } from './components/Games/GamesData.js'; // Import your game data
import GameDetail from './components/Games/GameDetail.js'; // Import the GameDetail component

const GameList = () => {
    const [selectedGame, setSelectedGame] = useState(null); // State for the selected game

    const handleCardClick = (game) => {
        setSelectedGame(game); // Set the selected game
    };

    const handleClose = () => {
        setSelectedGame(null); // Close the detail view
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gamesData.map((game) => (
                    <div
                        key={game.id}
                        className="bg-gray-800 rounded-lg p-4 cursor-pointer"
                        onClick={() => handleCardClick(game)} // Handle click on the card
                    >
                        <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-[200px] object-cover rounded-md"
                        />
                        <h2 className="text-lg font-semibold mt-2">{game.title}</h2>
                        <p className="text-yellow-400">Followers: {game.followers}</p>
                        <p className="text-yellow-400">Rating: {game.rating} ⭐</p>
                    </div>
                ))}
            </div>

            {/* Render the GameDetail component if a game is selected */}
            {selectedGame && (
                <GameDetail game={selectedGame} onClose={handleClose} />
            )}
        </div>
    );
};

export default GameList;