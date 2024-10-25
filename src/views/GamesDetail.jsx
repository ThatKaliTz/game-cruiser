import React, { useState } from "react";



const GameDetails = () => {


  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="container mx-auto">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Game Image */}
          <div className="lg:col-span-1">
            <img 
              src="\src\assets\posters\post_metaphor.png" 
              alt="Metaphor ReFantazio" 
              className="rounded-lg shadow-lg"
            />
          </div>
          
          {/* Right Side: Game Information */}
          <div className="lg:col-span-2">
            
            {/* Game Title */}
            <h1 className="text-4xl font-bold mb-4">Metaphor: ReFantazio</h1>
            
            {/* Info Section */}
            <div className="flex space-x-4 text-gray-400">
              <span className="bg-yellow-500 rounded-md text-xl text-white p-3">DETAILS</span>
              <span className="bg-yellow-500 rounded-md text-xl text-white p-3">REVIEWS</span>
              <span className="bg-yellow-500 rounded-md text-xl text-white p-3">GUIDES</span>
              <span className="bg-yellow-500 rounded-md text-xl text-white p-3">FORUM</span>
            </div>
            
            {/* Time Estimates */}
            <div className="mt-4 flex justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Main Story</h2>
                <p>65½ Hours</p>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Main + Sides</h2>
                <p>73½ Hours</p>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Completionist</h2>
                <p>101 Hours</p>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">All Styles</h2>
                <p>76½ Hours</p>
              </div>
            </div>
            
            {/* Game Description */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2">How long is Metaphor: ReFantazio?</h3>
              <p className="text-gray-300">
                When focusing on the main objectives, Metaphor: ReFantazio is about 65½ hours in length. 
                If you're a gamer that strives to see all aspects of the game, you are likely to spend around 
                101 hours to obtain 100% completion.
              </p>
            </div>
            
            {/* Game Platforms and Genres */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xl font-semibold">Platforms</h4>
                <p>PC, PlayStation 4, PlayStation 5, Xbox Series X/S</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Genres</h4>
                <p>Third-Person, Turn-Based, Action, Adventure, Role-Playing</p>
              </div>
            </div>
            
            {/* Publisher and Release Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xl font-semibold">Developers</h4>
                <p>Studio Zero</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Publishers</h4>
                <p>Atlus, Sega</p>
              </div>
            </div>
            
            {/* Release Dates */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xl font-semibold">NA Release</h4>
                <p>October 11, 2024</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">EU Release</h4>
                <p>October 11, 2024</p>
              </div>
            </div>
            
            {/* Price and Steam Link */}
            <div className="mt-6">
              <a 
                href="https://store.steampowered.com/" 
                className="inline-block bg-pink-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-pink-600 transition"
              >
                Steam - $69.99
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;