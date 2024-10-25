import React, { useState } from "react";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";



const gamesData = [
    {
        id: 1,
        title: "Game Title",
        image: "https://via.placeholder.com/150",
        followers: 30,
    },
    {
        id: 2,
        title: "Game Title",
        image: "https://via.placeholder.com/150",
        followers: 35,
    },
    {
        id: 3,
        title: "Game Title2",
        image: "https://via.placeholder.com/150",
        followers: 35,
    },
    {
        id: 4,
        title: "Game Title3",
        image: "https://via.placeholder.com/150",
        followers: 35,
    },
    {
        id: 5,
        title: "Game Title4",
        image: "https://via.placeholder.com/150",
        followers: 35,
    },
    {
        id: 6,
        title: "Game Title5",
        image: "https://via.placeholder.com/150",
        followers: 55,
    },
];

const reviewsData = [
    {
      gameName: "Game Title 1",
      rating: 4.5,
      comment: "Great game with an amazing storyline!",
      coverImage: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      gameName: "Game Title 2",
      rating: 5,
      comment: "Absolutely loved it! Highly recommend.",
      coverImage: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      gameName: "Game Title 3",
      rating: 3,
      comment: "It was okay, could use some improvements.",
      coverImage: "https://via.placeholder.com/100", // Replace with actual image URL
    },
  ];

  const friendsData = [
    {
      username: "Friend 1",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 2",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 3",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 4",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 5",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 6",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 7",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      username: "Friend 8",
      profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    },
  ];

const User = () => {
    
    const [activeTab, setActiveTab] = useState("Profile");
    const [profileOption, setProfileOption] = useState("Profile Information");
    const [userData, setUserData] = useState({
      username: "Username",
      name: "Name",
      email: "user@example.com",
      bio: "This is a sample bio.",
      profilePicture: "https://via.placeholder.com/100",
    });
    const [selectedImage, setSelectedImage] = useState(null);

    //-------------------REVIEWS pagination------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10; // Number of reviews to display per page

    // Calculate the index of the last review on the current page
    const indexOfLastReview = currentPage * reviewsPerPage;
    // Calculate the index of the first review on the current page
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    // Get the reviews for the current page
    const currentReviews = reviewsData.slice(indexOfFirstReview, indexOfLastReview);

    // Calculate total pages
    const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

    //---------------------FRIENDS pagination----------------------
    const [FcurrentPage, FsetCurrentPage] = useState(1);
    const friendsPerPage = 10; // Number of friends to show per page
  
    // Calculate the total number of pages
    const FtotalPages = Math.ceil(friendsData.length / friendsPerPage);
  
    // Get the current friends to display
    const indexOfLastFriend = FcurrentPage * friendsPerPage;
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
    const currentFriends = friendsData.slice(indexOfFirstFriend, indexOfLastFriend);
  
    const handleNextPage = () => {
      if (FurrentPage < FtotalPages) {
        FsetCurrentPage(FcurrentPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (FcurrentPage > 1) {
        FsetCurrentPage(FcurrentPage - 1);
      }
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
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setUserData((prevData) => ({
          ...prevData,
          profilePicture: imageUrl,
        }));
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <img 
            src={userData.profilePicture} 
            alt="User Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <h1 className="text-3xl font-bold text-white">{userData.username}</h1>
        </div>
        
        {/* Tabs */}
        <div className="mb-4">
          {["Profile", "Games", "Reviews", "Friends"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-semibold hover:bg-yellowish hover:text-black mr-2 ${
                activeTab === tab ? "bg-yellowish text-black" : "bg-primary border border-yellowish text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
  
        {/* Content for each main tab */}
        <div className="text-white">
          {activeTab === "Profile" && (
            <div className="flex h-[600px] overflow-y-auto ">
              {/* Profile Options Menu */}
              <div className="w-1/4 bg-primary border border-blueish p-4 hover:bg-blueishrounded-lg mr-4">
                {["Profile Information", "Edit Profile", "Sign Out"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setProfileOption(option)}
                    className={`block w-full text-left px-4 py-2 hover:bg-blueish rounded-md mb-2 ${
                      profileOption === option ? "bg-blueish text-white" : "bg-primary border border-blueish text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
  
              {/* Profile Content */}
              <div className="w-3/4 bg-primary border border-blueish p-4 rounded-lg max-h-[500px] overflow-y-auto">
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
                {profileOption === "Edit Profile" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                        
                        {/* Centered Profile Picture */}
                        <div className="flex justify-center mb-4">
                        <img 
                            src={userData.profilePicture} 
                            alt="User Profile" 
                            className="w-32 h-32 rounded-full" 
                        />
                        </div>
                        
                        <form>
                        <label className="block mb-2">
                            <span className="text-white">Profile Picture:</span>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full mt-1 rounded bg-gray-700 text-white"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-white">Username:</span>
                            <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-white">Name:</span>
                            <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-white">Email:</span>
                            <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-white">Bio:</span>
                            <textarea
                            name="bio"
                            value={userData.bio}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
                            />
                        </label>
                        <button type="button" className="bg-blueish text-white px-4 py-2 rounded-md mt-4">
                            Save Changes
                        </button>
                        </form>
                    </div>
                )}
                {profileOption === "Sign Out" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Sign Out</h2>
                    <p>Click the button below to sign out.</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md mt-4">Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === "Games" && (
            <div>
                <h2 className="text-2xl font-bold mb-4">User's Game List</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 h-[600px] overflow-y-auto">
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
            )}
          
          {activeTab === "Reviews" && (
            <div className="space-y-4">
                {currentReviews.map((review, index) => (
                <div 
                    key={index} 
                    className="flex bg-black border border-blueish p-4 rounded-lg shadow-md hover:bg-blueish transition duration-200 cursor-pointer"
                >
                    <img
                    src={review.coverImage}
                    alt={`${review.gameName} Cover`}
                    className="w-24 h-32 rounded-md mr-4"
                    />
                    <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-white">{review.gameName}</h3>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                    <p className="text-gray-300">{review.comment}</p>
                    </div>
                </div>
                ))}

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
        )}
         {activeTab === "Friends" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentFriends.map((friend, index) => (
              <div key={index} className="flex flex-col items-center bg-primary p-4 rounded-lg shadow-md cursor-pointer">
                <img
                  src={friend.profilePicture}
                  alt={`${friend.username}'s Profile`}
                  className="w-24 h-24 rounded-full mb-2"
                />
                <h3 className="text-lg font-semibold text-white">{friend.username}</h3>
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
      )}
        </div>
      </div>
    );
  };
  
  export default User;