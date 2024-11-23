import React, { createContext, useContext, useState, useEffect } from "react";
import Logo from "../../assets/logosmall.png";
import { IoMdSearch, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import "../../styles/general.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/AuthContext";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser, logout } = useAuth();
  const [isSignupOpen, setSignupOpen] = useState(false); // State for Sign Up popup
  const [isLoginOpen, setLoginOpen] = useState(false); // State for Login popup
  const [isAdminOpen, setAdminOpen] = useState(false); // State for Login popup

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    rememberMe: false,
    admin: false, 
  });
  const [gameData, setGameData] = useState({
    nombre: "",
    consola: "",
    foto: "",
    genero: "",
    anio: "",
    sinopsis: "",
    dmain: "", 
    dcomp: "", 
    publisher: "", 
    developer: "", 
    calificacion: "", 
  });
  const [isMenuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isBlueClicked, setBlueClicked] = useState(false);

  const closeDropdown = () => {
    setUserDropdownOpen(false);
    setMenuOpen(false); // Ensures mobile menu also closes
  };
  const dataUser = () => {
    console.log("xdddd");
  };

  const handleConfirmChanges = async () => {
    try {
      let uploadedImageUrl = gameData.foto; // Mantener la URL actual si no se cambió
  
      if (selectedImage) {
        const gameData = new FormData();
        gameData.append("image", selectedImage);
  
        // Subimos la imagen al backend
        const uploadResponse = await fetch("http://localhost:5119/api/juegos/upload", {
          method: "POST",
          body: gameData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Error uploading the image");
        }
  
        const { imageUrl } = await uploadResponse.json();
        uploadedImageUrl = imageUrl; // Nueva URL de la imagen
      }
  
      // Actualizamos el juego en la base de datos
      const updateResponse = await fetch("http://localhost:5119/api/juegos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foto: uploadedImageUrl,
          nombre: gameData.nombre,
          consola: gameData.consola,
          anio: gameData.anio,
          genero: gameData.genero,
          sinopsis: gameData.sinopsis,
          dmain: gameData.dmain, 
          dcomp: gameData.dcomp, 
          publisher: gameData.publisher, 
          developer: gameData.developer, 
          calificacion: gameData.calificacion, 
        }),
      });
  
      if (!updateResponse.ok) {
        throw new Error("Error updating the user");
      }
      if (updateResponse.ok) {
        const data = await updateResponse.json();
        if (data) {
          console.log(data);
            window.location.reload();
        }
    }
      
      
    } catch (error) {
      console.error(error);
      alert("An error occurred while confirming changes.");
    }
  };


  const handleUserClick = (event) => {
    setIsClicked(true); // Set isClicked to true when the user button is clicked
    setUserDropdownOpen(!isUserDropdownOpen);
    setMenuOpen(!isMenuOpen);

    // Remove the clicked class after 300ms to reset the effect
    setTimeout(() => {
      setIsClicked(false);
    }, 800); // The time should match your CSS transition duration
  };

  const handleBlueClick = () => {
    setBlueClicked(true);

    // Optionally, reset the background after a short delay
    setTimeout(() => {
      setBlueClicked(false);
    }, 300); // Adjust the duration as needed
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file); // Guardamos el archivo real para subirlo luego
      setUserData((prevData) => ({
        ...prevData,
        profilePicturePreview: imageUrl, // Mostramos la vista previa
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImageChangeGame = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file); // Guardamos el archivo real para subirlo luego
      setGameData((prevData) => ({
        ...prevData,
        profilePicturePreview: imageUrl, // Mostramos la vista previa
      }));
    }
  };
  const handleInputChangeGame = (e) => {
    const { name, value, type, checked } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const usuario = {
      nombre: formData.name,
      apellido: formData.lastname,
      user: formData.user,
      foto: "",
      email: formData.email,
      password: formData.password,
    };

    fetch("http://localhost:5119/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Usuario guardado:", data);
        alert("Usuario guardado correctamente.");
      })
      .catch((error) => {
        console.error("Error al guardar usuario:", error);
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      nombre: "",
      apellido: "",
      user: "",
      foto: "",
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:5119/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        setLoginOpen(false);

        if (data.user) {
          alert("Login successful");
          setLoggedInUser(data); // Guarda el usuario en el estado local

          // Guarda los datos del usuario en localStorage

          localStorage.setItem("loggedInUser", JSON.stringify(data));
        } else {
          console.warn("Login successful, but user data is missing.");
        }
      } else {
        alert("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const navigate = useNavigate(); // Inicializa el hook
  return (
    <div className="bg-primary font-grotesk">
      {/* Navbar 1 */}
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-7 md:px-7">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                isMenuOpen ? "w-10" : "w-14"
              }`}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8 ml-4 text-white">
            <li className="relative hidden md:flex items-center justify-right gap-3">
              <input
                type="search"
                placeholder="Search games.."
                className="py-2 px-4 rounded-xl bg-gray-700/50 cursor-textz"
              />
              <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" />
            </li>
            <Link
              to="/games"
              onClick={handleBlueClick}
              className={`cursor-pointer border border-blueish hover:bg-blueish px-5 py-2 rounded-2xl font-semibold min-w-[80px] text-center ${
                isBlueClicked ? "bg-blueish text-white" : "bg-black text-white"
              }`}
            >
              Games
            </Link>
            

            {loggedInUser && loggedInUser.admin == true ? (
            <Link
              
              onClick={() => setAdminOpen(true)}
              className={`cursor-pointer border border-blueish hover:bg-blueish px-5 py-2 rounded-2xl font-semibold min-w-[80px] text-center ${
                isBlueClicked ? "bg-blueish text-white" : "bg-black text-white"
              }`}
            >
              Añadir juego
            </Link>) : (null)}
          </div>
        </div>
        <div className="hidden lg:flex gap-4 text-white items-center">
          {loggedInUser ? (
            // Dropdown de usuario
            <div className="relative">
              <button
                onClick={handleUserClick}
                className={`cursor-pointer bg-black border border-yellowish hover:bg-yellowish hover:text-black px-5 py-2 
                    rounded-2xl font-semibold min-w-[80px] text-center ${
                      isUserDropdownOpen
                        ? "bg-yellowish text-black"
                        : "bg-primary border border-yellowish text-white"
                    }`}
              >
                Hello, {loggedInUser.user || "User"}
              </button>
              {isUserDropdownOpen && (
                <div
                  style={{ zIndex: 999 }}
                  className="absolute right-0 mt-2 bg-black border border-yellowish rounded-lg w-48 py-2 text-center"
                >
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/user/games"
                    className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Games
                  </Link>
                  <Link
                    to="/user/reviews"
                    className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Reviews
                  </Link>
                  <Link
                    to="/user/friends"
                    className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Friends
                  </Link>
                  <button
                    className="block w-full px-4 py-2 text-center hover:bg-yellowish hover:text-black hover:font-semibold"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate("/");
                      logout();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Botones de Login y Sign Up
            <>
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-2xl font-semibold min-w-[80px] text-center"
              >
                Login
              </button>
              <button
                onClick={() => setSignupOpen(true)}
                className="bg-pinkish hover:bg-pink-700 px-5 py-2 rounded-2xl font-semibold min-w-[80px] text-center"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className="lg:hidden block items-center">
          <div>
            <IoMdMenu
              className="text-3xl text-white cursor-pointer"
              onClick={() => setMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-primary text-white px-6 py-4 space-y-4 sm:mx-[30px] md:mx-[80px] lg:mx-[130px] xl:mx-[90px] ">
          <div className="relative">
            <input
              type="search"
              placeholder="Search games..."
              className="w-full bg-gray-700/50 px-4 py-3 pl-4 pr-10 rounded-2xl"
            />
            <IoMdSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-white cursor-pointer" />
          </div>
          <Link
            to="/games"
            onClick={() => {
              onClick = { closeDropdown };
              handleBlueClick;
            }}
            className={`block text-center py-2 bg-black border border-blueish rounded-2xl min-w-[80px] ${
              isBlueClicked ? "bg-blueish text-white" : "bg-black text-white"
            }`}
          >
            Games
          </Link>

          {/* User dropdown toggle for mobile */}
          <div className="relative">
            <button
              onClick={handleUserClick}
              className={`block w-full text-center py-2 bg-black border border-yellowish rounded-2xl ${
                isUserDropdownOpen === true
                  ? "bg-yellowish text-black"
                  : "bg-primary border border-yellowish text-white"
              }`}
            >
              {loggedInUser.user ? `Hello, ${loggedInUser.user}` : "User"}
            </button>
            {isUserDropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-black border border-yellowish rounded-lg w-full py-2 text-center z-10">
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                  onClick={() => {
                    onClick = { closeDropdown };
                    setMenuOpen(false);
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/user/games"
                  className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                  onClick={() => {
                    onClick = { closeDropdown };
                    setMenuOpen(false);
                  }}
                >
                  Games
                </Link>
                <Link
                  to="/user/reviews"
                  className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                  onClick={() => {
                    onClick = { closeDropdown };
                    setMenuOpen(false);
                  }}
                >
                  Reviews
                </Link>
                <Link
                  to="/user/friends"
                  className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                  onClick={() => {
                    onClick = { closeDropdown };
                    setMenuOpen(false);
                  }}
                >
                  Friends
                </Link>
                <button
                  className="block w-full px-4 py-2 text-center hover:bg-yellowish hover:text-black hover:font-semibold"
                  onClick={() => {
                    closeDropdown;
                    setMenuOpen(false);
                    navigate("/");
                    logout();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setLoginOpen(true)}
            className="w-full text-center py-2 bg-gray-700 rounded-2xl min-w-[80px]"
          >
            Login
          </button>
          <button
            onClick={() => setSignupOpen(true)}
            className="w-full text-center py-2 bg-pinkish rounded-2xl min-w-[80px]"
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Popup for Sign Up */}
      {isSignupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSignupOpen(false)} // Close the popup if clicked outside
        >
          <div
            className="bg-primary text-white border border-pinkish p-6 rounded-lg w-[11/12] min-w-[200px] max-h-[90vh] overflow-y-auto sm:w-[300px] md:w-[400px] lg:w-1/3 xl:w-1/4 xl:max-w-[600px] relative"
            onClick={(e) => e.stopPropagation()} // Prevent close if clicked inside
          >
            <button
              onClick={() => setSignupOpen(false)} // Close the popup
              className="absolute top-2 right-2 text-pinkish text-xl focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
              Sign Up
            </h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="name">
                  Name (max 16 characters):
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  maxLength="16"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl sm:h-[25px] md:h-[25px] lg:h-[30px] xl:h-[40px]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="lastname">
                  Last Name (max 16 characters):
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  maxLength="16"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl sm:h-[25px] md:h-[25px] lg:h-[30px] xl:h-[40px]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="user">
                  Username (max 16 characters):
                </label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  maxLength="16"
                  value={formData.user}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl sm:h-[25px] md:h-[25px] lg:h-[30px] xl:h-[40px]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl sm:h-[25px] md:h-[25px] lg:h-[30px] xl:h-[40px]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl sm:h-[25px] md:h-[25px] lg:h-[30px] xl:h-[40px]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="confirmPassword">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl sm:h-[25px] md:h-[25px] lg:h-[30px] xl:h-[40px]"
                />
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="termsAccepted" className="text-sm">
                    Accept Terms
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-pinkish hover:bg-pink-700 px-6 py-2 rounded-full text-white font-semibold w-full sm:w-auto"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup for Login */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setLoginOpen(false)} // Close the popup if clicked outside
        >
          <div
            className="bg-primary text-white border border-pinkish p-6 rounded-lg w-11/12 sm:w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/4 relative"
            onClick={(e) => e.stopPropagation()} // Prevent close if clicked inside
          >
            <button
              onClick={() => setLoginOpen(false)} // Close the popup
              className="absolute top-2 right-2 text-pinkish text-xl focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
              Login
            </h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-black border border-pinkish p-2 w-full rounded-2xl"
                />
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-pinkish hover:bg-pink-700 px-6 py-2 rounded-full text-white font-semibold w-full sm:w-auto"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAdminOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setAdminOpen(false)} // Close the popup if clicked outside
        >
          <div
            className="bg-primary text-white border border-pinkish p-6 rounded-lg w-[11/12] min-w-[1000px] min-h-[90vh] max-h-[90vh] overflow-y-auto sm:w-[300px] md:w-[400px] lg:w-1/3 xl:w-1/4 xl:max-w-[600px] relative"
            onClick={(e) => e.stopPropagation()} // Prevent close if clicked inside
          >
            <button
              onClick={() => setAdminOpen(false)} // Close the popup
              className="absolute top-2 right-2 text-pinkish text-xl focus:outline-none"
            >
              &times;
            </button>
            <div className="flex bg-primary border border-blueish p-40 rounded-lg max-h-[85vh] overflow-y-auto pt-8, justify-center , items-center" >

              { (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
      <div className="flex justify-center mb-4">
        <img
         
          alt="User Profile"
          className="w-32 h-32 rounded-full"
        />
      </div> */}
      <div className="mx-10">
        <form>
          {/* Input de imagen */}
          <label className="block mb-2">
            <span className="text-white">Imagen del juego:</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 rounded bg-gray-700 text-white"
            />
          </label>
          {/* Campos de texto */}
          <label className="block mb-2">
            <span className="text-white">Titulo:</span>
            <input
              type="email"
              name="nombre"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Consola:</span>
            <input
              type="text"
              name="consola"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Genero:</span>
            <input
            type="text"
              name="genero"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">anio:</span>
            <input
            type="date"
              name="anio"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Sinopsis:</span>
            <input
            type="text"
              name="sinopsis"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Calificacion:</span>
            <input
            type="text"
              name="calificacion"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Duracion completionista:</span>
            <input
            type="text"
              name="dcomp"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Duracion normal:</span>
            <input
            type="text"
              name="dmain"
              
              onChange={handleInputChangeGame}
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>

          <label className="block mb-2">
            <span className="text-white"> Publisher:           </span>
            <input
            type="text"
              name="publisher"
              
              onChange={handleInputChangeGame}
              className="w-50 mt-1 ml-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="block mb-2">
            <span className="text-white">Developer:</span>
            <input
            type="text"
              name="developer"
              
              onChange={handleInputChangeGame}
              className="w-50 mt-1 ml-1 px-2 py-1 rounded bg-gray-700 text-white"
            />
          </label>
          {/* Confirmar cambios */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
              onClick={handleConfirmChanges}
            >
              Confirm Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
