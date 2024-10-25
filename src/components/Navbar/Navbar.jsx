import React, { useState } from "react";
import Logo from "../../assets/logosmall.png";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isSignupOpen, setSignupOpen] = useState(false); // State for Sign Up popup
    const [isLoginOpen, setLoginOpen] = useState(false); // State for Login popup
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        rememberMe: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here
        setSignupOpen(false);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        setLoginOpen(false);
    };

    return (
        <div className="bg-primary">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center text-white">
                        <Link to="/"> {/* Change href to Link to */}
                            <img src={Logo} alt="Logo" className="w-16" />
                        </Link>
                        <div>
                            <ul className="flex gap-8 items-center">
                                <li className="relative">
                                    <input type="search" name="search" id="search" placeholder="Search games.." className="bg-gray-700/50 px-4 py-2 rounded-2xl" />
                                    <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3" />
                                </li>
                                <li>
                                    <Link to="/user" className="cursor-pointer">User</Link>
                                </li>
                                <li>
                                    <Link to="/games" className="cursor-pointer">Games</Link> {/* Update to use Link */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-white">
                        <ul className="flex gap-4 items-center">
                            <li>
                                <a 
                                    onClick={() => setLoginOpen(true)} // Open login popup
                                    className="bg-gray-700 inline-block px-6 py-3 rounded-2xl font-semibold cursor-pointer"
                                >
                                    Login
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => setSignupOpen(true)} // Open sign up popup
                                    className="bg-pinkish inline-block px-6 py-3 rounded-2xl font-semibold cursor-pointer"
                                >
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Popup for Sign Up */}
            {isSignupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-primary text-white border border-pinkish p-6 rounded-lg w-11/12 md:w-1/3 relative">
                        <button
                            onClick={() => setSignupOpen(false)} // Close the popup
                            className="absolute top-2 right-2 text-pinkish text-xl focus:outline-none"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
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
                                    className="bg-black border border-pinkish p-2 w-full rounded-2xl"
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
                                    className="bg-black border border-pinkish p-2 w-full rounded-2xl"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="password">Password (min 6 characters):</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    minLength="6"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-black border border-pinkish p-2 w-full rounded-2xl"
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
                                    className="bg-black border border-pinkish p-2 w-full rounded-2xl"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span className="ml-2">Accept Terms and Conditions</span>
                                </label>
                            </div>
                            <button type="submit" className="bg-pinkish inline-block px-6 py-3 rounded-2xl font-semibold">
                                Accept
                            </button>
                        </form>
                        <p className="mt-4">
                            Do you already own an account? 
                            <a href="#" className="text-blue-500"> Login here</a>
                        </p>
                    </div>
                </div>
            )}

            {/* Popup for Login */}
            {isLoginOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-primary text-white border border-pinkish p-6 rounded-lg w-11/12 md:w-1/3 relative">
                        <button
                            onClick={() => setLoginOpen(false)} // Close the popup
                            className="absolute top-2 right-2 text-pinkish text-xl focus:outline-none"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
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
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    <span className="ml-2">Remember Me</span>
                                </label>
                            </div>
                            <button type="submit" className="bg-pinkish inline-block px-6 py-3 rounded-2xl font-semibold">
                                Accept
                            </button>
                        </form>
                        <p className="mt-4">
                            New user? 
                            <a href="#" className="text-blue-500"> Sign up here</a>
                        </p>
                        <p className="mt-2">
                            <a href="#" className="text-blue-500">Forgot your password?</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;