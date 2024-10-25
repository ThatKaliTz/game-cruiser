import React from "react";
import LogoFull from "../../assets/logo3.png";

const LogoFullFooter = {
    backgroundImage: `url(${LogoFull})`,
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    width: "150px", // Smaller container width
    height: "170px", // Smaller container height
    backgroundSize: "contain", // Ensures the image remains complete and fits inside the container
  };

const Footer = () => {
    return <>
    <footer className="bg-gray-700 text-white py-8">
      <div className="container mx-auto flex justify-between items-start space-y-4">
        
        {/* Left Column (Logo) */}
 {/* Left Section: Logo */}
 <div style={LogoFullFooter} className="row-span-1 sm:row-span-2 sm:col-span-2 h-[350px] rounded-xl relative"></div>

        {/* Middle Column (Social Links) */}
        <div className="flex flex-col space-y-2">
          <h5 className="font-bold">Social</h5>
            <div className="flex flex-col space-y-2  text-blue-400">
                <a href="/" className="hover:text-gray-400">Discord</a>
                <a href="/" className="hover:text-gray-400">Facebook</a>
                <a href="/" className="hover:text-gray-400">Twitter</a>
            </div>
        </div>

        {/* Right Column (Information and Copyright) */}
        <div className="flex flex-col space-y-2 text-right">
          <h5 className="font-bold">Information</h5>
          <div className="flex flex-col space-y-2 text-right text-blue-400">
          <a href="/" className="hover:text-gray-400">Contact Us</a>
          <a href="/" className="hover:text-gray-400">Code of Conduct</a>
          <a href="/" className="hover:text-gray-400">Privacy Policy</a>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
            <p className="text-gray-400 mt-4 ">Game Cruiser</p>
            <p className="text-gray-400">&copy; 2011–2024 Ziff Davis, LLC</p>
            <div className="flex justify-end space-x-2 text-blue-400">
                <a href="/" className="hover:underline">Accessibility</a>
                <a href="/" className="hover:underline">AdChoices</a>
                <a href="/" className="hover:underline">Terms of Use</a>
            </div>
        </div>
      </div>
    </footer>

    

    
    </>;
}
export default Footer;