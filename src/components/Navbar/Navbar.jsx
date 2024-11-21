import React, { useState, useEffect } from "react";
import Logo from "../../assets/logosmall.png";
import { IoMdSearch, IoMdMenu} from "react-icons/io";
import { Link } from "react-router-dom";
import '../../styles/general.css';

const Navbar = () => {
    const [isSignupOpen, setSignupOpen] = useState(false); // State for Sign Up popup
    const [isLoginOpen, setLoginOpen] = useState(false); // State for Login popup
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        user: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        rememberMe: false,
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

    const handleUserClick = (event) => {
        setIsClicked(true); // Set isClicked to true when the user button is clicked
        setUserDropdownOpen(!isUserDropdownOpen);
        isMenuOpen(false);
        
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
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
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
            foto: '',
            email: formData.email,
            password: formData.password,
        };
    
        fetch('http://localhost:5119/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario guardado:', data);
            alert('Usuario guardado correctamente.');
        })
        .catch(error => {
            console.error('Error al guardar usuario:', error);
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            nombre: '',
            apellido: '',
            user: '',
            foto: '',
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
            } else {
                alert("Login failed: Invalid credentials");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="bg-primary font-grotesk">

             {/* Navbar 1 */}
            <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-7 md:px-7">
                <div className="flex items-center">
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="Logo"
                            className={`transition-all duration-300 ${isMenuOpen ? 'w-10' : 'w-14'}`}
                        />
                    </Link>
                    <div className="hidden lg:flex items-center gap-8 ml-4 text-white">
                        <li className="relative hidden md:flex items-center justify-right gap-3">
                            <input type="search" placeholder="Search games.." className="py-2 px-4 rounded-xl bg-gray-700/50 cursor-textz" />
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
                        
                    </div>
                </div>
                    <div className="hidden lg:flex gap-4 text-white items-center">
                        {/* User dropdown toggle */}
                        <div className="relative">
                            <button
                                onClick={handleUserClick}                                
                                className={`cursor-pointer bg-black border border-yellowish hover:bg-yellowish hover:text-black px-5 py-2 
                                    rounded-2xl font-semibold min-w-[80px] text-center ${
                                        isUserDropdownOpen === true ? "bg-yellowish text-black" : "bg-primary border border-yellowish text-white"
                                }`}
                            >
                                User
                            </button>
                            {isUserDropdownOpen && (
                                <div style={{ zIndex: 999 }} className="absolute right-0 mt-2 bg-black border border-yellowish rounded-lg w-48 py-2 text-center">
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
                                        onClick={() => setUserDropdownOpen(false)}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setLoginOpen(true)} className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-2xl font-semibold min-w-[80px] text-center">
                            Login
                        </button>
                        <button onClick={() => setSignupOpen(true)} className="bg-pinkish hover:bg-pink-700 px-5 py-2 rounded-2xl font-semibold min-w-[80px] text-center">
                            Sign Up
                        </button>
                    </div>
                    <div className="lg:hidden block items-center">
                        <div>
                            <IoMdMenu className="text-3xl text-white cursor-pointer" onClick={() => setMenuOpen(!isMenuOpen)} />
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
                    onClick={() => {onClick={closeDropdown}; handleBlueClick; }}
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
                            isUserDropdownOpen === true ? "bg-yellowish text-black" : "bg-primary border border-yellowish text-white"
                        }`}
                    >
                        User
                    </button>
                    {isUserDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-black border border-yellowish rounded-lg w-full py-2 text-center z-10">
                            <Link
                                to="/user/profile"
                                className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                                onClick={() => {onClick={closeDropdown}; setMenuOpen(false); }}
                            >
                                Profile
                            </Link>
                            <Link to="/user/games" className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                            onClick={() => {onClick={closeDropdown}; setMenuOpen(false);}}>
                                Games
                            </Link>
                            <Link to="/user/reviews" className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                            onClick={() => {onClick={closeDropdown}; setMenuOpen(false);}}>
                                Reviews
                            </Link>
                            <Link to="/user/friends" className="block px-4 py-2 hover:bg-yellowish hover:text-black hover:font-semibold"
                            onClick={() => {onClick={closeDropdown}; setMenuOpen(false);}}>
                                Friends
                            </Link>
                            <button className="block w-full px-4 py-2 text-center hover:bg-yellowish hover:text-black hover:font-semibold"
                            onClick={() => {onClick={closeDropdown}; setMenuOpen(false);}}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={() => setLoginOpen(true)} className="w-full text-center py-2 bg-gray-700 rounded-2xl min-w-[80px]">
                    Login
                </button>
                <button onClick={() => setSignupOpen(true)} className="w-full text-center py-2 bg-pinkish rounded-2xl min-w-[80px]">
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
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Sign Up</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="name">Name (max 16 characters):</label>
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
                                <label className="block mb-1" htmlFor="lastname">Last Name (max 16 characters):</label>
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
                                <label className="block mb-1" htmlFor="user">Username (max 16 characters):</label>
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
                                <label className="block mb-1" htmlFor="email">Email:</label>
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
                                <label className="block mb-1" htmlFor="password">Password:</label>
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
                                <label className="block mb-1" htmlFor="confirmPassword">Confirm Password:</label>
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
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="email">Email:</label>
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
                                <label className="block mb-1" htmlFor="password">Password:</label>
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
        </div>
    );
}

export default Navbar;