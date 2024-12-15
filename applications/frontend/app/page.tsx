"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Planet from "../assets/background-planet.png";
import Surface from "../assets/surface.png";
import Logo from "../assets/logo.png";
import Rocket from "../assets/rocket.png";
import Instagram from "../assets/instagram.png";
import axios from "axios";

const currentYear = new Date().getFullYear();

export default function Landing() {
  // handle the parallax effect for landing
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: { preventDefault: () => void; deltaY: any }) => {
    event.preventDefault(); // Disable native scrolling
    const delta = event.deltaY; // Scroll direction
    setScrollPosition((prev) => Math.max(0, Math.min(prev + delta, 100))); // Clamp between 0-100
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  // Handle the email modal and state
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [population, setPopulation] = useState(0); // State for email count

  const validateEmail = (email: string): boolean => {
    // Check if email is empty or contains only spaces
    if (!email.trim()) {
      return false;
    }

    // Validate email format using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Fetch email count initially
  useEffect(() => {
    const fetchEmailCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/emails");
        setPopulation(response.data.length); // Set the initial population count
      } catch (error) {
        console.error("Error fetching initial email count:", error);
        setPopulation(0); // Fallback in case of an error
      }
    };

    fetchEmailCount();
  }, []); // Runs only once on component mount

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if(!yearOfBirth){
      alert("Please select your year of birth");
      return;
    }

    if(!state){
      alert("Please select the state you're from")
      return;
    }

    setShowModal(false);
    setEmail(""); // Clear email after submission
    setError(""); // Clear error

    // Call backend API
    try {
      const response = await axios.post("http://localhost:3000/emails", {
        email,
        yearOfBirth,
        state,
      });

      if (response.status === 201) {
        alert("Email successfully added!");

        // Fetch updated email count after successful addition
        try {
          const countResponse = await axios.get("http://localhost:3000/emails");
          setPopulation(countResponse.data.length); // Update the email count
        } catch (countError) {
          console.error("Error fetching updated email count:", countError);
          alert("Failed to update population count. Please refresh the page.");
        }
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          setError("Email already exists. Please use a different email.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Could not connect to the server. Please try again.");
      }
    }
  };

  const [isVertical, setIsVertical] = useState(false);

  // Detect the orientation dynamically
  useEffect(() => {
    const checkOrientation = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    // Run on mount and resize
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <div className={`relative h-screen overflow-hidden`}>
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out ${
          showModal ? "filter blur-sm" : ""
        }`}
      >
        {/* Planet Background */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
          style={{
            opacity: 1 - scrollPosition / 100,
            transform: `translateY(${scrollPosition * -0.5}px)`,
          }}
        >
          <div className="w-full flex aspect-[1387/1384] relative">
            {/* Planet Background */}
            <Image
              src={Planet}
              alt={"A look of Frontera from space."}
              className="
          object-cover w-full absolute z-10 
          translate-y-[-3%] sm:translate-y-[-5%] md:translate-y-[-7.5%] lg:translate-y-[-9%] 
          xl:translate-y-[-11%] 2xl:translate-y-[-11%]"
            />

            {/* Content and Logo */}
            <div className="w-full absolute aspect-[1387/1384] z-30 relative">
              {/* Logo */}
              <Image
                src={Logo}
                alt={"Logo"}
                className="
            absolute w-[40%] left-[12.5%] 
            top-[37%] sm:top-[32%] md:top-[26%] lg:top-[22%] 
            xl:top-[17%] 2xl:top-[17%]"
              />

              {/* Text */}
              <h1
                className="absolute text-white top-[44%] sm:top-[40%] md:top-[33%] lg:top-[28%] 
          xl:top-[23%] 2xl:top-[22%]"
                style={{
                  fontSize: `clamp(1rem, 5vw, 15rem)`,
                  left: "55.5%",
                }}
              >
                Coming soon
              </h1>
              <h2
                className="absolute text-white font-thin italic top-[51%] sm:top-[47%] md:top-[40%] lg:top-[35%] 
          xl:top-[30%] 2xl:top-[29%]"
                style={{
                  fontSize: `clamp(0.5rem, 1.8vw, 10rem)`,
                  left: "57%",
                }}
              >
                Your Journey, Our Frontier.
              </h2>

              {/* Button */}
              <div
                className={`absolute z-[100] pointer-events-auto ${
                  isVertical
                    ? "bottom-[3%] left-[50%] transform -translate-x-1/2"
                    : "top-[3%] right-[12%]"
                }`}
              >
                {/* Instagram Icon */}
                <a
                  href="https://www.instagram.com/frontera.official/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute w-[60%] transform -translate-x-[120%] translate-y-[-45%] ${
                    isVertical ? "left-[30%] w-[80%] top-[48%]" : "top-[45%]"
                  }`}
                >
                  <Image src={Instagram} alt="Instagram" />
                </a>

                {/* Notify Me Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className={`bg-gray-700 text-white rounded-full hover:bg-gray-600 transition translate-x-[35%] ${
                    isVertical ? "left-[40%] w-[140%] top-[55%]" : "top-[45%]"
                  }`}
                  style={{
                    fontSize: `clamp(1rem, 1vw, 2rem)`,
                    padding: `clamp(1rem, 1vw, 1rem) clamp(1rem, 1.5vw, 2rem)`,
                  }}
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Surface Background */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
          style={{
            opacity: scrollPosition / 100,
            transform: `translateY(${(100 - scrollPosition) * 0.5}px)`,
          }}
        >
          <Image
            src={Surface}
            alt="Surface View"
            className="object-cover w-full h-screen"
          />
        </div>

        {/* Rocket and Light Effect */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
          style={{
            opacity: scrollPosition / 100,
            transform: `translateY(${(100 - scrollPosition) * 0.2}px)`,
          }}
        >
          {/* Rocket */}
          <Image
            src={Rocket}
            alt="Rocket"
            className={` ${
              isVertical
                ? "absolute top-[20%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 w-[130%] z-20"
                : "absolute top-[33%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 w-[130%] z-20"
            }`}
          />

          {/* Add population text and number of population from the backend data */}
          <div className="absolute transform -translate-y-[130%] -translate-x-[170%] top-[50%] left-[50%] text-center">
            <p
              className={` text-transparent bg-clip-text bg-gradient-to-r from-[#6565f1] via-[#574ae2] to-[#7867f9] opacity-85 ${
                isVertical
                  ? "transform -translate-x-[-120%] -translate-y-[70%]"
                  : "transform -translate-x-[-100%] -translate-y-[-100%]"
              }`}
              style={{
                fontSize: `clamp(2.5rem, 5vw, 5rem)`,
                textShadow: `0 4px 8px rgba(0, 0, 0, 0.4)`,
              }}
            >
              Population
            </p>
            <p
              className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3f5b98] via-[#1fb6ff] to-[#1b5079] opacity-100 ${
                isVertical
                  ? "transform -translate-x-[-120%] -translate-y-[30%]"
                  : "transform -translate-x-[-170%]"
              }`}
              style={{
                fontSize: `clamp(5rem, 6vw, 5rem)`,
                textShadow: `0 5px 10px rgba(0, 0, 0, 0.6)`,
              }}
            >
              {population}
            </p>
          </div>

          {/* Light Effect */}
          <div className="absolute top-[70%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
   <div className="fixed inset-0 flex items-center justify-center z-50">
   <div className="bg-white p-6 shadow-md relative">
     <h2 className="text-lg font-semibold text-gray-700 mb-4">Enter your Details</h2>
 
     {/* Email Input */}
     <input
       type="email"
       placeholder="frontera@offical.com"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
       className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
     /><br/>
 
     {/* Year of birth */}
     <select
        value={yearOfBirth}
        onChange={(e) => setYearOfBirth(e.target.value)}
        className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
      >
        <option value="">Select Year of Birth</option>
        {Array.from({ length: 56 }, (_, i) => currentYear - (i + 15)).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <br/>
 
     {/* State Dropdown */}
     <select
       value={state}
       onChange={(e) => setState(e.target.value)}
       className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
     >
       <option value="">Select State</option>
       {[
         "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
         "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
         "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
         "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
         "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
         "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
         "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
         "Wisconsin", "Wyoming" 
       ].map((state) => (
         <option key={state} value={state}>
           {state}
         </option>
       ))}
     </select>
 
     {/* Buttons */}
     <div className="mt-4 flex justify-end gap-2">
       <button
         onClick={() => setShowModal(false)}
         className="py-2 px-4 bg-gray-400 rounded hover:bg-red-300 transition"
       >
         Cancel
       </button>
       <button
         onClick={handleSubmit}
         className="py-2 px-4 bg-blue-900 text-white rounded hover:bg-blue-500 transition"
       >
         Submit
       </button>
     </div>
   </div>
 </div> 
      )}
    </div>
  );
}
