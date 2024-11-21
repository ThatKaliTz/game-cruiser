import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";
import OmoriPoster from "/src/assets/posters/post_omori.jpg"; // Import your image
import HiFiPoster from "/src/assets/posters/post_hifi_rush.jpg"; 
import HadesPoster from "/src/assets/posters/post_hades.jpg"; 
import MetaphorPoster from "/src/assets/posters/post_metaphor.png"; 
import GOWPoster from "/src/assets/posters/post_godofwar.jpg";
import P3RPoster from "/src/assets/posters/post_persona3r.jpg"; 
import CupheadPoster from "/src/assets/posters/post_cuphead.jpg"; 

const reviewsData = [
  { gameName: "Game Title 1", rating: 4.5, comment: "Great game with an amazing storyline!", coverImage: "https://via.placeholder.com/100" },
  { gameName: "Game Title 2", rating: 5, comment: "Absolutely loved it! Highly recommend.", coverImage: "https://via.placeholder.com/100" },
  { gameName: "Game Title 3", rating: 3, comment: "It was okay, could use some improvements.", coverImage: "https://via.placeholder.com/100" },
  { gameName: "Game Title 4", rating: 3, comment: "Great game with an amazing storyline!", coverImage: "https://via.placeholder.com/100" },
  { gameName: "Game Title 5", rating: 3, comment: "Absolutely loved it! Highly recommend.", coverImage: "https://via.placeholder.com/100" },
  { gameName: "Game Title 6", rating: 3, comment: "Absolutely loved it! Highly recommend.", coverImage: "https://via.placeholder.com/100" },
  { gameName: "Game Title 7", rating: 3, comment: "Absolutely loved it! Highly recommend.", coverImage: "https://via.placeholder.com/100" }
];

const friendsData = [
  { username: "Friend 1", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 2", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 3", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 4", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 5", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 6", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 7", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 8", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 9", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 10", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 11", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 12", profilePicture: "https://via.placeholder.com/100" },
  { username: "Friend 13", profilePicture: "https://via.placeholder.com/100" }
];

const GameCardData = [
  { id: 1, title: "Omori", image: OmoriPoster, rating: 4.5 },
  { id: 2, title: "Hi-Fi Rush", image: HiFiPoster, rating: 5 },
  { id: 3, title: "Hades", image: HadesPoster, rating: 5 },
  { id: 4, title: "Metaphor: Re-Fantazio", image: MetaphorPoster, rating: 3 },
  { id: 5, title: "God of War", image: GOWPoster, rating: 4 },
  { id: 6, title: "Cuphead", image: CupheadPoster, rating: 3 },
];

const FriendProfile = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileOption, setProfileOption] = useState("Profile Information");

  const itemsPerPageGames = 12; // Number of items per page for Games, Reviews, and Friends
  const itemsPerPageReviews = 6;
  const itemsPerPageFriends = 12;
  const [gamesPage, setGamesPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [friendsPage, setFriendsPage] = useState(1);
  
  // Use mock data or pass user data from an API or props
  const [userData, setUserData] = useState({
    username: "OtherUser", 
    name: "Other User Name", 
    email: "otheruser@example.com", 
    bio: "This is the bio of another user.",
    profilePicture: "https://via.placeholder.com/100",
  });

  useEffect(() => {
    if (location.pathname === "/friendprofile/profile") {
      setActiveTab("Profile");
    } else if (location.pathname === "/friendprofile/games") {
      setActiveTab("Games");
    } else if (location.pathname === "/friendprofile/reviews") {
      setActiveTab("Reviews");
    } else if (location.pathname === "/friendprofile/friends") {
      setActiveTab("Friends");
    }
  }, [location.pathname]);

  //-------------------REVIEWS pagination------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewsData.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  const getPaginatedData_Games = (data, page) => {
    const start = (page - 1) * itemsPerPageGames;
    const end = start + itemsPerPageGames;
    return data.slice(start, end);
  };

  const getPaginatedData_Reviews = (data, page) => {
    const start = (page - 1) * itemsPerPageReviews;
    const end = start + itemsPerPageReviews;
    return data.slice(start, end);
  };

  const getPaginatedData_Friends = (data, page) => {
    const start = (page - 1) * itemsPerPageFriends;
    const end = start + itemsPerPageFriends;
    return data.slice(start, end);
  };

  // Pagination controls
  const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="bg-primary border border-yellowish text-white hover:bg-yellowish hover:text-black px-4 py-2 cursor-pointer rounded-md"
      >
        Previous
      </button>
      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-yellowish text-black"
                : "bg-primary text-white hover:bg-yellowish hover:text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-primary border border-yellowish text-white hover:bg-yellowish hover:text-black px-4 py-2 cursor-pointer rounded-md"
      >
        Next
      </button>
    </div>
  );

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

  const Review = ({ comment }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // Split the comment into words to determine if truncation is needed
    const words = comment.split(" ");
    const isTruncated = words.length > 50;
    const displayedText = isExpanded ? comment : words.slice(0, 50).join(" ");
  
    return (
      <div>
        <p className="text-gray-300">
          {displayedText}
          {isTruncated && !isExpanded && "..."}
        </p>
        {isTruncated && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-pinkish hover:underline"
          >
            {isExpanded ? "Read less" : "Read more..."}
          </button>
        )}
      </div>
    );
  };

  
  return (
    <div className="container mx-auto p-4 font-grotesk">
      <div className="flex items-center mb-6">
        <img 
          src={userData.profilePicture} 
          alt="User Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <h1 className="text-3xl font-bold text-white">{userData.username}</h1>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap justify-center sm:justify-start sm:flex-row flex-col items-center sm:items-start space-y-2 sm:space-y-0">
        {["Profile", "Games", "Reviews", "Friends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold hover:bg-yellowish hover:text-black sm:mr-2 min-w-[350px] max:w-[450px] sm:min-w-[100px]  ${
              activeTab === tab
                ? "bg-yellowish text-black"
                : "bg-primary border border-yellowish text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content for each main tab */}
      <div className="text-white">
        {activeTab === "Profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Another User's Profile</h2>
            <div className="flex flex-col md:flex-row h-[600px] overflow-y-auto">
              <div className="w-full md:w-1/4 bg-primary border border-blueish p-4 rounded-lg mb-4 md:mb-0 pt-8">
                {["Profile Information"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setProfileOption(option)}
                    className={`block w-full text-left px-4 py-2 hover:bg-blueish rounded-md mb-2 ${profileOption === option ? "bg-blueish text-white" : "bg-primary border border-blueish text-white"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-3/4 bg-primary border border-blueish p-4 rounded-lg max-h-[700px] overflow-y-auto pt-8">
                {profileOption === "Profile Information" && (
                  <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                    <img src={userData.profilePicture} alt="User Profile" className="w-32 h-32 rounded-full mb-4" />
                    <h2 className="text-2xl font-bold text-center mb-6">{userData.username}</h2>

                    <div className="bg-primary border border-blueish p-6 rounded-lg shadow-md w-full max-w-md">
                      <p className="text-gray-300 mb-4">
                        <span className="text-blueish font-semibold">Name:</span> {userData.name}
                      </p>
                      <p className="text-gray-300 mb-4">
                        <span className="text-blueish font-semibold">Email:</span> {userData.email}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-blueish font-semibold">Bio:</span> {userData.bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "Games" && (
        <div>
            <h2 className="text-2xl font-bold mb-4">Another User's Game List</h2>
           <div className="container mb:h-[100px]">
            {/* Large screen grid layout */}
            <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {getPaginatedData_Games(GameCardData, gamesPage).map((game) => (
                      <Link 
                        to="/gamesdetails">
                            <div
                    key={game.id}
                    className="bg-gray-800 rounded-lg overflow-hidden relative h-[350px] w-flex lg:h-[420px] xl:h-[550px]"
                >
                    <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <h3 className="font-semibold text-white">{game.title}</h3>
                    <div className="flex">{renderStars(game.rating)}</div>
                    </div>
                </div>
                          
                      </Link>
              
                ))}
            </div>

            {/* Small and Extra Small screen list layout */}
            <div className="lg:hidden">
                {getPaginatedData_Games(GameCardData, gamesPage).map((game) => (      
                  <Link 
                  to="/gamesdetails"
                    key={game.id}
                    className="flex flex-col sm:flex-row bg-gray-800 rounded-lg overflow-hidden mb-4"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full sm:w-24 h-24 object-cover"
                    />
                    <div className="flex flex-col justify-center p-4">
                      <h3 className="font-semibold text-white">{game.title}</h3>
                      <div className="flex">{renderStars(game.rating)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            <PaginationControls
            currentPage={gamesPage}
            totalPages={Math.ceil(GameCardData.length / itemsPerPageGames)}
            onPageChange={setGamesPage}
            />
        </div>
        )}
          
          {activeTab === "Reviews" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
              <div className="space-y-4">
                {getPaginatedData_Reviews(reviewsData, reviewsPage).map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-primary border border-blueish p-4 rounded-lg space-x-4"
                  >
                    <img
                      src={review.coverImage}
                      alt={review.gameName}
                        className="w-24 h-32 rounded-md mr-4  object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {review.gameName}
                      </h3>
                      <div className="flex space-x-1">{renderStars(review.rating)}</div>
                      <Review comment={review.comment} />
                    </div>
                    <Link
                      to={`/gamesdetails`} // Assuming game ID matches the index + 1
                      className="text-white bg-black border border-pinkish px-4 py-2 rounded-lg hover:bg-pinkish font-semibold"
                    >
                      Go to Game
                    </Link>
                  </div>
                ))}
              </div>
              <PaginationControls
                currentPage={reviewsPage}
                totalPages={Math.ceil(reviewsData.length / itemsPerPageReviews)}
                onPageChange={setReviewsPage}
              />
            </div>
          )}
        
        {activeTab === "Friends" && (
          <div className="my-10">
            <h2 className="text-2xl font-bold m-4">Another User's Friend List</h2>

            <div>
              <div className="mb-7">
              <div className="grid grid-cols-2 grid-rows-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-row-3 md:grid-row-3 lg:grid-row-3 xl:grid-row-4 gap-4">
              {getPaginatedData_Friends(friendsData, friendsPage).map((friend, index) => (
              <div key={index} className="flex items-center bg-black border border-blueish p-4 rounded-lg">
                <img src={friend.profilePicture} alt={friend.username} className="w-16 h-16 rounded-full mr-4" />
                <h3>{friend.username}</h3>
              </div>
            ))}
                </div>

              </div>
            </div>
            <PaginationControls
            currentPage={friendsPage}
            totalPages={Math.ceil(friendsData.length / itemsPerPageFriends)}
            onPageChange={setFriendsPage}
          />
          </div>
        )}

      </div>
    </div>
  );
};

export default FriendProfile;