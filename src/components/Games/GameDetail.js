import React from 'react';

const GameDetail = ({ game, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-primary text-white border border-pinkish p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-pinkish text-xl focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">{game.title}</h2>
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-auto object-cover rounded-md mb-4"
                />
                <p className="text-yellow-400">Followers: {game.followers}</p>
                <p className="text-yellow-400">Rating: {game.rating} ⭐</p>
                <p className="mt-4">Description: {game.description}</p>
                <p className="mt-4">Release Date: {game.releaseDate}</p>
                <p className="mt-4">Playtime: {game.playtime} hours</p>
            </div>
        </div>
    );
};

export default GameDetail;