import React from "react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { FaStar, FaRegStarHalf, FaRegStar, FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

//Carousel images
import HeroPersona3 from "/src/assets/hero/persona3r_banner.jpg";
import HeroLethalCompany from "/src/assets/hero/lethal-company.jpeg";
import HeroTGAceAttorney from "/src/assets/hero/the-great-ace-attorney.jpg";
import HeroBMWukong from "/src/assets/hero/bm_wukong.jpg";
import HeroBaldursGate3 from "/src/assets/hero/BaldursGate3.jpeg";
import HeroCODBO6 from "/src/assets/hero/COD_BO6.jpeg";

//Poster images
import OmoriPoster from "/src/assets/posters/post_omori.jpg"; // Import your image
import HiFiPoster from "/src/assets/posters/post_hifi_rush.jpg"; 
import HadesPoster from "/src/assets/posters/post_hades.jpg"; 
import MetaphorPoster from "/src/assets/posters/post_metaphor.png"; 
import GOWPoster from "/src/assets/posters/post_godofwar.jpg";
import P3RPoster from "/src/assets/posters/post_persona3r.jpg"; 
import CupheadPoster from "/src/assets/posters/post_cuphead.jpg"; 

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
};

const GameCardData = [
  { id: 1, title: "Omori", image: OmoriPoster, rating: 4.5 },
  { id: 2, title: "Hi-Fi Rush", image: HiFiPoster, rating: 5 },
  { id: 3, title: "Hades", image: HadesPoster, rating: 5 },
  { id: 4, title: "Metaphor: Re-Fantazio", image: MetaphorPoster, rating: 3 },
  { id: 5, title: "God of War", image: GOWPoster, rating: 4 },
  { id: 6, title: "Cuphead", image: CupheadPoster, rating: 3 },
];

const SlideDetails = ({ title, description, genres }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const toggleReadMore = () => setIsReadMore((prev) => !prev);
  const toggleShowAllGenres = () => setShowAllGenres((prev) => !prev);

  return (
    <div className="flex-auto bg-gray-700 bg-opacity-70 p-6 text-white min-w-[150px] md:max-w-[250px] flex flex-col lg:max-w-[310px]">
      {/* Title Section */}
      <div className="overflow-hidden mt-2 ml-2 flex-grow">
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* Description Section */}
        <div className={`mt-4 text-sm description ${isReadMore ? "" : "max-h-[200px]"} hidden lg:block`}>
          <p
            style={{
              WebkitLineClamp: isReadMore ? "unset" : 3,
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              overflow: "hidden",
              position: "relative",
              maskImage: isReadMore
                ? "none"
                : "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              WebkitMaskImage: isReadMore
                ? "none"
                : "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Show More/Show Less Buttons */}
        <div className="flex justify-end">
          {!isReadMore && (
            <button
              className="mt-2 text-yellowish hover:text-white hidden lg:inline"
              onClick={toggleReadMore}
            >
              Show more...
            </button>
          )}
          {isReadMore && (
            <button
              className="mt-2 text-yellowish hover:text-white hidden lg:inline"
              onClick={toggleReadMore}
            >
              Show less...
            </button>
          )}
        </div>
      </div>

      {/* Genres Section */}
      <div className="mt-auto flex flex-col hidden lg:block relative">
        <p className="font-semibold">Genres</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold"
            >
              {genre}
            </span>
          ))}

          {/* Show CiCirclePlus if more than 3 genres */}
          {genres.length > 3 && (
            <button onClick={toggleShowAllGenres} className="text-yellow-500 hover:text-white ml-2 rounded-full">
              <CiCirclePlus size={20} />
            </button>
          )}

          {/* Popup with all genres */}
          {showAllGenres && (
            <div className="absolute top-full mt-2 left-0 bg-gray-800 p-4 rounded-md shadow-lg z-10 w-max">
              <p className="font-semibold">All Genres</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Read More Button (Always Visible) */}
      <div className="flex justify-end mt-3">
      <Link to="/gamesdetails">
        <button className="border border-yellowish text-white hover:bg-yellowish hover:text-black rounded-2xl text-center py-2 px-2 font-semibold">
            Read more
        </button>
      </Link>
      </div>
    </div>
  );
};

const Carousel = ({ slides }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr === slides.length - 1 ? 0 : curr + 1));

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional: for desktop mouse events
  });

  return (
    <div className="flex max-w-[1500px] mx-auto justify-center flex-col md:flex-row" {...handlers}>
      {/* Slide Images Section */}
      <div className="relative w-full md:w-2/3 overflow-hidden">
        <div
          style={{ transform: `translateX(-${curr * 100}%)` }}
          className="flex transition-transform ease-out duration-500"
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="min-w-full h-auto object-contain"
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button onClick={prev} className="p-1 rounded-full shadow text-white/80 hover:text-white">
            <FaArrowAltCircleLeft size={40} />
          </button>
          <button onClick={next} className="p-1 rounded-full shadow text-white/80 hover:text-white">
            <FaArrowAltCircleRight size={40} />
          </button>
        </div>

        <div className="absolute bottom-4 right-0 left-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurr(i)}
              className={`cursor-pointer transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Details Section */}
      <SlideDetails
        title={slides[curr].title}
        description={slides[curr].description}
        genres={slides[curr].genres}
      />
    </div>
  );
};

const Hero3 = () => {
 const slides = [
  {
    src: HeroPersona3,
    title: "Persona 3 Reload",
    description: "Discover the mysterious world of Persona 3 Reload.",
    genres: ["RPG", "Adventure", "Single Player", "Turn-Based"],
  },
  {
    src: HeroLethalCompany,
    title: "Lethal Company",
    description: "Multiplayer excitement awaits.",
    genres: ["Multiplayer", "Horror", "Co-op"],
  },
  {
    src: HeroTGAceAttorney,
    title: "The Great Ace Attorney Chronicles",
    description: "Dive into detective work and thrilling cases.",
    genres: ["Adventure", "Puzzle", "Mystery"],
  },
  {
    src: HeroBMWukong,
    title: "Black Myth: Wukong",
    description: "Experience the legendary tale of the Monkey King.",
    genres: ["Action", "RPG", "Fantasy"],
  },
  {
    src: HeroBaldursGate3,
    title: "Baldur's Gate 3",
    description:
      "Baldur’s Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power.",
    genres: ["RPG", "Strategy", "Fantasy"],
  },
];

  return (
    <div className="w-full h-full bg-primary container font-grotesk mt-5">
       <h1 className="text-2xl sm:text-3xl font-bold text-white">Featured Games</h1>
       <div className="justify-items-center mt-5">
          <Carousel slides={slides} />
        </div>
    </div>
   
  );
};

const TrendingGames = () => (
  <section className="py-10 bg-primary text-white font-grotesk">
    <div className="container mx-auto px-10">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Currently Trending Games</h1>
        <Link
          to="/games"
         className="bg-black border border-blueish hover:bg-blueish text-white inline-block px-4 py-2 rounded-xl font-semibold"
          >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-[50px] mt-5 place-items-center">
        {GameCardData.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-2xl overflow-hidden relative lg:w-[150px] xl:w-[200px] ">
            <Link to="/gamesdetails">
              <img src={game.image} alt={game.title} className="w-full h-40 sm:h-48 md:h-64 lg:h-[250px] lg:w-[150px] xl:w-[200px] xl:h-[300px] object-cover" />
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

const RecommendedArticles = () => (
  <section className="py-10 bg-primary text-white font-grotesk">
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Recommended Articles</h1>
        <button className="bg-black border border-blueish hover:bg-blueish text-white inline-block px-4 py-2 rounded-xl font-semibold">View All</button>
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

const AboutUs = () => (
  <section className="py-10 bg-black text-white font-grotesk mb-10">
    <div className="container mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg sm:text-xl max-w-2xl mx-auto">
        Welcome to <span className="text-yellow-500 font-bold">Game Cruiser</span>! Our platform is dedicated to capturing the spirit of adventure we experience while playing video games. 
        Our logo, a video game controller soaring through space, symbolizes the journey and achievements you gain with every game you play. 
        <span className="text-yellow-500 font-semibold"> Game Cruiser</span> is here to help you relive those epic moments and unforgettable victories.
      </p>
    </div>
  </section>
);

const LandingPage = () => (
  <div>
    <Hero3 />
    <TrendingGames />
    <RecommendedArticles />
    <AboutUs />
  </div>
);

export default LandingPage;