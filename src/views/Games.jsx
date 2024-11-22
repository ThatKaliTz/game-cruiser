import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";

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
};

const Games = () => {
  const [games, setGames] = useState([]); // Almacena los datos de los juegos
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5; // Juegos por página

  // Fetch de datos del backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5119/api/juegos"); // Ajusta el puerto si es necesario
        const data = await response.json();
        setGames(data); // Guardar los juegos en el estado
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
    

  }, []);

  // Calcular los juegos a mostrar por página
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Calcular total de páginas
  const totalPages = Math.ceil(games.length / gamesPerPage);

  return ( 
    <section className="py-10 bg-primary text-white font-sans">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Popular Games</h1>

        {/* Grid para pantallas grandes */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {currentGames.map((game) => (
            
            <div
              key={game.nombre}
              className="bg-gray-800 rounded-lg overflow-hidden relative"
            >
              <Link to={`/gamesdetails/${game.nombre}`}>
                <img
                  src={game.foto}
                  alt={game.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <h3 className="font-semibold text-white">{game.nombre}</h3>
                  <div className="flex">{renderStars(game.calificacion)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Layout para pantallas pequeñas */}
        <div className="lg:hidden">
          {currentGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col sm:flex-row bg-gray-800 rounded-lg overflow-hidden mb-4"
            >
              <img
                src={game.foto}
                alt={game.nombre}
                className="w-full sm:w-24 h-24 object-cover"
              />
              <div className="flex flex-col justify-center p-4">
                <h3 className="font-semibold text-white">{game.nombre}</h3>
                <div className="flex">{renderStars(game.calificacion)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de paginación */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-primary border border-yellowish text-white hover:bg-yellowish hover:text-black px-4 py-2 cursor-pointer rounded-md"
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-yellowish text-black"
                      : "bg-primary text-white hover:bg-yellowish hover:text-black"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
