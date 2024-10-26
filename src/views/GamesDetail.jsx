import React, { useState } from "react";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";


const userData = [
  {
    username: "User 1",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 2",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 3",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 4",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 5",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 6",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 7",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    username: "User 8",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
  },
];

const gameGuides = [
  {
    id: 1,
    title: "Beginner's Guide",
    description: "Get started with the basics and essential tips to kickstart your journey.",
    link: "#",
  },
  {
    id: 2,
    title: "Advanced Combat Tips",
    description: "Learn advanced combat techniques to defeat the toughest enemies.",
    link: "#",
  },
  {
    id: 3,
    title: "Collectibles & Secrets",
    description: "Find all hidden items, collectibles, and secrets in the game.",
    link: "#",
  },
  {
    id: 4,
    title: "Boss Strategies",
    description: "Detailed strategies for tackling each boss and their unique mechanics.",
    link: "#",
  },
];

const forumTopics = [
  { id: 1, title: "Tips for Beginners", description: "Share your best tips for new players.", posts: 12, link: "/forum/tips-for-beginners" },
  { id: 2, title: "Advanced Strategies", description: "Discuss advanced strategies for endgame.", posts: 8, link: "/forum/advanced-strategies" },
  { id: 3, title: "Favorite Characters", description: "Who are your favorite characters?", posts: 15, link: "/forum/favorite-characters" },
  { id: 4, title: "Latest Patch Notes", description: "Talk about the latest game updates.", posts: 5, link: "/forum/latest-patch-notes" },
];

const GameDetails = () => {
  const [activeTab, setActiveTab] = useState("Details");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4; // 

  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
const [newTopic, setNewTopic] = useState({ title: "", content: "" });

const handleCreateTopic = () => {
  setIsCreatingTopic(!isCreatingTopic); // Toggle the visibility of the form
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewTopic((prev) => ({ ...prev, [name]: value }));
};

const handleSubmitTopic = () => {
  // Logic to handle the submission, e.g., saving to a database
  console.log("New Topic:", newTopic);
  setIsCreatingTopic(false);
  setNewTopic({ title: "", content: "" }); // Clear the form after submission
};

  const currentReviews = [
    {
      coverImage: "https://via.placeholder.com/100",
      gameName: "Metaphor: ReFantazio",
      rating: 5,
      comment: "An amazing experience with stunning visuals and engaging gameplay!",
    },
    {
      coverImage: "https://via.placeholder.com/100",
      gameName: "Metaphor: ReFantazio",
      rating: 4,
      comment: "Fantastic story and immersive world. Could use more side quests!",
    },
    {
      coverImage: "https://via.placeholder.com/100",
      gameName: "Metaphor: ReFantazio",
      rating: 3,
      comment: "Good game, but some areas felt a bit repetitive.",
    },
    {
      coverImage: "https://via.placeholder.com/100",
      gameName: "Metaphor: ReFantazio",
      rating: 5,
      comment: "A masterpiece! The graphics and soundtrack are phenomenal.",
    },
    {
      coverImage: "https://via.placeholder.com/100",
      gameName: "Metaphor: ReFantazio",
      rating: 2,
      comment: "Meh.",
    },
  ];

  // Calculate the index of the first and last reviews for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviewsPage = currentReviews.slice(indexOfFirstReview, indexOfLastReview);

   // Calculate total pages
   const totalPages = Math.ceil(currentReviews.length / reviewsPerPage);

    // Function to change page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="container mx-auto">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Game Information */}
          <div className="lg:col-span-2">
            
            {/* Game Title */}
            <h1 className="text-4xl font-bold mb-4">Metaphor: ReFantazio</h1>
            
            {/* Tabs */}
            <div className="mb-4">
              {["Details", "Reviews", "Guides", "Forum"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 hover:text-black mr-2 ${
                    activeTab === tab ? "bg-yellow-500 text-black" : "bg-primary border border-yellow-500 text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Details" && (
              <div>
                {/* Time Estimates */}
                <div className="mt-4 flex justify-between bg-blueish p-4 rounded-lg shadow-lg">
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
                
                {/* Platforms, Genres, Developers, Publishers */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xl font-semibold">Platforms</h4>
                    <p>PC, PlayStation 4, PlayStation 5, Xbox Series X/S</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Genres</h4>
                    <p>Third-Person, Turn-Based, Action, Adventure, Role-Playing</p>
                  </div>
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

                {/* Price and Link */}
            <div className="mt-6">
              <a 
                href="https://store.steampowered.com/" 
                className="inline-block bg-primary border border-pinkish text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-pinkish transition"
              >
                Steam - $69.99
              </a>
            </div>
              </div>
            )}
            
            {activeTab === "Reviews" && (
              <div className="space-y-4">
                {/* Reviews Content */}
                {currentReviewsPage.map((review, index) => (
                  <div 
                    key={index} 
                    className="flex bg-black border border-blueish p-4 rounded-lg shadow-md hover:bg-blueish transition duration-200 cursor-pointer"
                  >
                    <img
                      src={review.coverImage}
                      alt={`${review.gameName} Cover`}
                      className="w-24 h-24 rounded-full mb-2"
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

          {activeTab === "Guides" && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Game Guides</h2>
              <ul className="space-y-4">
                {gameGuides.map((guide) => (
                  <li key={guide.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-yellow-500 mb-1">{guide.title}</h3>
                    <p className="text-gray-300 mb-2">{guide.description}</p>
                    <a 
                      href={guide.link} 
                      className="inline-block mt-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
                    >
                      Read More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {activeTab === "Forum" && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Game Forum</h2>

            {/* Button to create a new topic */}
            <button
              onClick={handleCreateTopic}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold mb-6"
            >
              {isCreatingTopic ? "Cancel" : "Create New Topic"}
            </button>

            {/* Form for creating a new topic */}
            {isCreatingTopic && (
              <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                <label className="block text-white mb-2">
                  Topic Title
                  <input
                    type="text"
                    name="title"
                    value={newTopic.title}
                    onChange={handleInputChange}
                    className="bg-primary w-full p-2 mt-1 rounded-lg text-black"
                    placeholder="Enter topic title"
                  />
                </label>
                
                <label className="block text-white mb-2">
                  Content
                  <textarea
                    name="content"
                    value={newTopic.content}
                    onChange={handleInputChange}
                    className="bg-black w-full p-2 mt-1 rounded-lg text-black"
                    placeholder="Write your topic content here..."
                    rows="5"
                  />
                </label>
                
                <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmitTopic}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
                >
                  Submit Topic
                </button>
</div>
              </div>
            )}

            {/* Forum topics list */}
            <ul className="space-y-4">
              {forumTopics.map((topic) => (
                <li key={topic.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-500 mb-1">{topic.title}</h3>
                      <p className="text-gray-300">{topic.description}</p>
                      <p className="text-gray-400 text-sm">{topic.posts} posts</p>
                    </div>
                    <a
                      href={topic.link}
                      className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
                    >
                      View Discussion
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

          </div>

          {/* Right Side: Game Image */}
          <div className="lg:col-span-1">
            <img 
              src="/src/assets/posters/post_metaphor.png" 
              alt="Metaphor ReFantazio" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;