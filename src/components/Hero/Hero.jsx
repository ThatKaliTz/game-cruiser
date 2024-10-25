import React from "react";
import CoverImg from "../../assets/hero/persona3r_banner.jpg";


const bgImage = {
  backgroundImage: `url(${CoverImg})`,
  backgroundSize: "cover", // Keeps the image covering the entire container
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "400px", // Fixed height for the container
  width: "100%", // Full width of the parent
  backgroundColor: "black", // Fallback color
};

const bgSquare = {
  width: "450px", // Width of the square
  height: "250px", // Height of the square
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Black with 70% transparency
  marginTop: "1rem", // Optional margin for spacing
  borderRadius: "15px", // Rounded edges
  display: "flex", // Use Flexbox
  flexDirection: "column", // Stack elements vertically
  justifyContent: "center", // Vertically center content
  alignItems: "center", // Horizontally center content
  textAlign: "left", // Center text inside the square
  padding: "20px", // Adds margin inside the square
};
      


const Hero = () => {
  return <>
  <div className="bg-primary container">
    <div style = {bgImage} className="bg-primary min-h-[600px] flex items-center">
      <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Semi-transparent square */}
            <div style={bgSquare}>
              {/*content section*/}
                <div>
                    <p className="text-lg text-yellow-500 font-semibold">Discover Games, Remember Them Forever</p>
                    <h1 className="text-5xl font-bold text-white">Read About Games That You Enjoy</h1>
                    <button className="mt-8 bg-yellow-500 inline-block px-6 py-3 rounded-2xl font-semibold">Start Exploring</button>
                  </div>
            </div>
      </div>
      </div>
    </div>
  </div>
  </>
};

export default Hero;