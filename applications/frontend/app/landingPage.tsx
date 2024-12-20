"use client";
import { useState } from "react";
import Image from "next/image";
import LogoBlack from "../assets/blacklogo.png";
import YT from "../assets/ytlogo.png";
import Twitter from "../assets/twitterlogo.png";
import LinkedIn from "../assets/linkedinlogo.png";
import Instagram from "../assets/instalogo2.png";
import "./globals.css";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import ComingSoon from "./comingSoon";

export default function Landing() {

    let [current, setCurrent] = useState<number>(0);
    let numSlides = 4;

    let prevSlide = () => {
      if (current === 0) {
        setCurrent(numSlides - 1);
      } else {
        setCurrent(current - 1);
      }
    }

    let nextSlide = () => {
      if (current === numSlides - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function for opening and closing the menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
  return (
    <div className="container mx-auto">
      {/* Only ease when going into navbar, not when exiting (mobile) */}
      <nav className={`container mx-auto border-solid px-6 flex items-center border-solid ${isMenuOpen ? 'transition ease duration-700 bg-gray-100' : ''}`}>
        <a href="#">
          <Image src={LogoBlack} alt={"LogoBlack"} className="hidden sm:flex h-20 w-auto opacity-40"/>
        </a>
        <ul className="invisible sm:visible flex-1 text-right divide-x" dir="rtl pe-20">
            {/* Change to the actual links or coming soon page once those pages are created */}
            {/* This is the better navbar, no black bg on join us and line dividers on x-axis */}
          <li className="list-none inline-block px-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Home</a> </li>
          <li className="list-none inline-block px-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Our story</a> </li>
          <li className="list-none inline-block px-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Projects</a> </li>
          <li className="list-none inline-block px-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Contact Us</a> </li>
          <li className="list-none inline-block px-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Faqs</a> </li>
          <li className="list-none inline-block px-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Join us</a> </li>
        </ul>

        <div className="absolute place-self-start pt-4 flex items-center sm:hidden">
        {/* <!-- Mobile menu button--> */}
        <button onClick={toggleMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-black hover:text-white focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">
          <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
        

        {/* Mobile menu, show/hide based on toggleMenu */}
        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1 text-right px-2 pb-3 pt-2">
            <li className="list-none block pl-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Home</a> </li>
            <li className="list-none block pl-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Our story</a> </li>
            <li className="list-none block pl-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Projects</a> </li>
            <li className="list-none block pl-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Contact Us</a> </li>
            <li className="list-none block pl-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Faqs</a> </li>
            <li className="list-none block pl-5"><a href="#" className="no-underline text-black px-2 font-mono hover:text-gray-600">Join Us</a> </li>
          </div>
        </div>
      </nav>

      {/* All content goes inside this div */}
      <div className="container mx-auto border-solid px-6">
        {/* First content */}
        <div className="mt-8 sm:mt-48">
          <p className="font-light text-gray-400 pb-10">Expedition 1 starts in []</p>
          <h1 className="text-5xl sm:text-6xl font-semibold leading-normal sm:leading-normal ">6 WEEKS. ONE IDEA. ARE<br></br>YOU READY TO BUILD?</h1>
        </div>
        <div className="py-10 flex"> {/* Buttons */}
          <button type="button" className="relative inline-flex items-center justify-center
                                          rounded-md px-8 py-2 text-white bg-black
                                          hover:text-grey-400 focus:outline-none focus:ring-2
                                          focus:ring-inset focus:ring-white"
                                          aria-controls="mobile-menu" aria-expanded="false">Apply to E1</button>
          <button type="button" className="relative inline-flex items-center justify-center
                                          rounded-md px-8 py-2 text-gray-700 hover:bg-black
                                          hover:text-white focus:outline-none focus:ring-2
                                          focus:ring-inset focus:ring-white ml-6"
                                          aria-controls="mobile-menu" aria-expanded="false">See Projects</button>
        </div>
        <div className="py-28"></div>

        {/* Journey content */}
        <div className="flex-auto content-center">
          <h1 className="text-5xl font-semibold text-center pb-8">the journey starts online</h1>
          <p className="font-light text-center py-8 container-sm">This is where you take any idea that you're excited about and turn it<br></br>into something that people care about</p>
        </div>
        <div className="py-28"></div>

          {/* Funny spaced boxes content */}
          <div className="flex flex-row w-full">
            <div className="basis-1/3">
              <div className="flex flex-row w-full py-7 justify-center">
                <div className="h-20 w-20 bg-gray-300 rounded-3xl"></div>
              </div>
              <h3 className="text-lg font-semibold text-center pb-8">join for free</h3>
            </div>
            <div className="basis-1/3">
              <div className="flex flex-row py-7 justify-center w-full">
                <div className="h-20 w-20 bg-gray-300 rounded-3xl"></div>
              </div>
              <h3 className="text-lg font-semibold text-center pb-8">work on ur idea</h3>
            </div>
            <div className="basis-1/3">
              <div className="flex flex-row py-7 justify-center w-full">
                <div className="h-20 w-20 bg-gray-300 rounded-3xl"></div>
              </div>
              <h3 className="text-lg font-semibold text-center pb-8">find your people</h3>
            </div>
        </div>
        <div className="py-28"></div>

        {/* Project type content */}
        <div className="flex-auto content-center">
          <h1 className="text-5xl font-semibold text-center pb-16">What kind of projects should I build?</h1>
          <div className="flex-auto content-center"> {/* Using w-1/3 would really be ideal, but for some reason its messing up the centering, look into later*/}
            <p className="hidden sm:block font-light text-gray-500 text-center">It can be anything! From getting your 100 subscribers,<br></br>
                                                  building an app, researching new ai models, starting a small<br></br>
                                                  business, making music, Anything. Nothing is too big or small.</p>
            <p className="sm:hidden font-light text-gray-500 text-center">It can be anything! From getting your 100 subscribers,
                                                  building an app, researching new ai models, starting a small
                                                  business, making music, Anything. Nothing is too big or small.</p>
          </div>
          <p className="font-bold text-center sm:pt-1">Follow your Passion.</p>                                                         
        </div>
        <div className="py-28"></div>

        {/* skool content */}
        <div className="flex-auto content-center">
          <h1 className="text-5xl font-semibold text-center pb-16">school, work (or both?)</h1>
          <div className="flex-auto content-center">
            <p className="font-light text-gray-500 text-center">We make sure everything is online and recorded so that you<br></br>
                                                                can schedule your own time.</p>
          </div>
        </div>
        <div className="py-28"></div>


        {/* 1 livestream content */}
        <div className="flex justify-center">
            <button type="button" className="relative inline-flex text-sm
                                          rounded-full px-8 py-2 mb-8 text-gray-500 bg-gray-300
                                          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                          >How does it work?</button>
        </div>
        <div className="flex-auto content-center">
          <h1 className="text-5xl font-semibold text-center pb-16">every week, we have 1 livestream,<br></br>and 1 update</h1>
          <div className="flex-auto content-center">
            <p className="hidden sm:block font-light text-gray-500 pb-8 text-center">We make sure everything is online and recorded so that you<br></br>
                                                                can schedule your own time. It's pretty simple. Build, get<br></br>
                                                                feedback, iterate alongside hundreds of others</p>
            <p className="sm:hidden font-light text-gray-500 pb-8 text-center">We make sure everything is online and recorded so that you
                                                                can schedule your own time. It's pretty simple. Build, get
                                                                feedback, iterate alongside hundreds of others</p>
          </div>
          <p className="font-light text-gray-500 text-center">not sure? <a className="underline hover:text-black" href="#">check our faqs</a></p> 
        </div>
        <div className="py-28"></div>

        {/* Factions */}
        <div className="flex-auto content-center">
          <h1 className="text-5xl font-semibold text-center pb-8">Join a Faction</h1>
        </div>
        <div className="hidden lg:flex flex-row w-full">
            <div className="basis-1/4 p-4">
              <div className="flex flex-row py-7 justify-center w-full">
                <div className="w-full h-96 bg-gray-300 rounded-md grid">
                  <h3 className="text-lg font-semibold text-center pt-8">Pioneers</h3>
                  <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/>

                  <button type="button" className="place-self-end text-sm mr-6
                                          rounded-md px-8 py-2 mb-6 text-black bg-white hover:bg-gray-100
                                          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                          >more</button> 
                </div>
              </div>
            </div>
            <div className="basis-1/4 p-4">
              <div className="flex flex-row py-7 justify-center">
                <div className="w-full h-96 bg-gray-300 rounded-md grid">
                  <h3 className="text-lg font-semibold text-center pt-8">Navigators</h3>
                  <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/>

                  <button type="button" className="place-self-end text-sm mr-6
                                          rounded-md px-8 py-2 mb-6 text-black bg-white hover:bg-gray-100
                                          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                          >more</button> 
                </div>
              </div>
            </div>
            <div className="basis-1/4 p-4">
              <div className="flex flex-row py-7 justify-center">
                <div className="w-full h-96 bg-gray-300 rounded-md grid">
                  <h3 className="text-lg font-semibold text-center pt-8">Pathfinders</h3>
                  <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/>

                  <button type="button" className="place-self-end text-sm mr-6
                                          rounded-md px-8 py-2 mb-6 text-black bg-white hover:bg-gray-100
                                          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                          >more</button> 
                </div>
              </div>
            </div>
            <div className="basis-1/4 p-4">
              <div className="flex flex-row py-7 justify-center">
                <div className="w-full h-96 bg-gray-300 rounded-md grid">
                  <h3 className="text-lg font-semibold text-center pt-8">Prospectors</h3>
                  <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/>

                  <button type="button" className="place-self-end text-sm mr-6
                                          rounded-md px-8 py-2 mb-6 text-black bg-white hover:bg-gray-100
                                          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                          >more</button> 
                </div>
              </div>
            </div>
        </div>


        <div className="lg:hidden w-full">
            <div className="flex flex-row py-7 justify-center w-full">
              <div className="w-full h-96 bg-gray-300 rounded-md grid">
                <h3 className="text-lg font-semibold text-center pt-8">Pioneers</h3>
                {/* <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center h-32 w-auto opacity-40"/> */}

                <button type="button" className="place-self-end text-sm mr-3 bg-white hover:bg-gray-100
                                        rounded-md px-6 py-2 mb-4 text-black
                                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        >more</button> 
              </div>
            </div>
            <div className="flex flex-row py-7 justify-center">
              <div className="w-full h-96 bg-gray-300 rounded-md grid">
                <h3 className="text-lg font-semibold text-center pt-8">Navigators</h3>
                {/* <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/> */}

                <button type="button" className="place-self-end text-sm mr-3
                                        rounded-md px-6 py-2 mb-4 text-black bg-white hover:bg-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        >more</button> 
              </div>
            </div>
            <div className="flex flex-row py-7 justify-center">
              <div className="w-full h-96 bg-gray-300 rounded-md grid">
                <h3 className="text-lg font-semibold text-center pt-8">Pathfinders</h3>
                {/* <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/> */}

                <button type="button" className="place-self-end text-sm mr-3
                                        rounded-md px-6 py-2 mb-4 text-black bg-white hover:bg-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        >more</button> 
              </div>
            </div>
            <div className="flex flex-row py-7 justify-center">
              <div className="w-full h-96 bg-gray-300 rounded-md grid">
                <h3 className="text-lg font-semibold text-center pt-8">Prospectors</h3>
                {/* <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/> */}

                <button type="button" className="place-self-end text-sm mr-3
                                        rounded-md px-6 py-2 mb-4 text-black bg-white hover:bg-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        >more</button> 
              </div>
            </div>
        </div>




        <div className="py-28"></div>

        {/* Double pictures */}
        <div className="flex flex-row rounded-lg bg-slate-200 pt-4 pb-8">
          <div className="basis-1/2 bg-white rounded-lg m-7 ">
            <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/>      
          </div>
          <div className="basis-1/2 bg-white rounded-lg m-7 ">
            <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center w-auto opacity-40"/>      
          </div>
        </div>
        <div className="py-28"></div>

        {/* First content */}
        <div className="flex flex-rows-2 mb-8">
          <h1 className="text-5xl font-semibold leading-normal">We have a<br></br>community</h1>
          <div className="bg-white rounded-lg">
            {/* <Image src={LogoBlack} alt={"LogoBlack"} className="justify-center h-24 w-auto opacity-40"/>    IMAGE HERE   */}
          </div>
        </div>
        <div className="flex">
          <p className="hidden sm:block font-light text-gray-500 pb-8 text-left">Finding the right people can be a challenge --wether you're<br></br>
                                                                searching for your next cofounder or just someone to<br></br>
                                                                brainstorm with. That's where our [website] somes in!</p>
          <p className="sm:hidden font-light text-gray-500 pb-8 text-left">Finding the right people can be a challenge --wether you're
                                                                searching for your next cofounder or just someone to
                                                                brainstorm with. That's where our [website] somes in!</p>
        </div>
        <div className="py-10 sm:py-28"></div>

        {/* irl content */}
        <div className="flex-auto content-center">
          <h1 className="text-6xl font-semibold text-center pb-8">At the end we meet <br></br>irl</h1>
          <p className="font-light text-center py-8 container-sm">After you hit the 6 week mark you are invited toan in person<br></br>event. The next irl is in [].</p>
        </div>
        <div className="py-10 sm:py-28"></div>

        {/* Carousel content */}
        <div className="overflow-hidden relative bg-gray-100 rounded-full">
          <div className="flex transition ease-out duration-700" style={{
              transform: `translateX(-${current * 100}%)`,
            }}>
            <Image src={LogoBlack} className="opacity-10 w-auto" alt="logo"/>
            <Image src={LogoBlack} className="opacity-30 w-auto" alt="logo"/>
            <Image src={LogoBlack} className="opacity-50 w-auto" alt="logo"/>
            <Image src={LogoBlack} className="opacity-70 w-auto" alt="logo"/>
          </div>

          <div className="absolute top-0 h-full w-full justify-between items-center flex px-10 text-3xl">
            <button onClick={prevSlide}> {/* FaCircleArrowLeft is the arrow that POINTS TO THE LEFT, meaning the one on the right not the one on the left*/}
              <FaCircleArrowLeft/>
            </button>
            <button onClick={nextSlide}>
              <FaCircleArrowRight/>
            </button>
            
          </div>

          <div className="absolute bottom-3 sm:bottom-8 flex justify-center gap-3 w-full">
            <button><div onClick={() => {
              setCurrent(0)
            }} key="0" className={`rounded-full transition ease duration-700 h-4 sm:h-5 ${current === 0 ? 'bg-black w-7 sm:w-8' : 'bg-gray-300 w-4 sm:w-5'}`}></div></button>
            <button><div onClick={() => {
              setCurrent(1)
            }} key="1" className={`rounded-full transition ease duration-700 h-4 sm:h-5 ${current === 1 ? 'bg-black w-7 sm:w-8' : 'bg-gray-400 w-4 sm:w-5'}`}></div></button>
            <button><div onClick={() => {
              setCurrent(2)
            }} key="2" className={`rounded-full transition ease duration-700 h-4 sm:h-5 ${current === 2 ? 'bg-black w-7 sm:w-8' : 'bg-gray-500 w-4 sm:w-5'}`}></div></button>
            <button><div onClick={() => {
              setCurrent(3)
            }} key="3" className={`rounded-full transition ease duration-700 h-4 sm:h-5 ${current === 3 ? 'bg-black w-7 sm:w-8' : 'bg-gray-600 w-4 sm:w-5'}`}></div></button>
          </div>
        </div>

        <div className="py-10 sm:py-28"></div>



        {/* next season content */}
        <div className="flex-auto content-center">
          <h1 className="text-6xl font-semibold text-center">I want to be part of the next <br></br> season</h1>
        </div>
        <div className="py-10 flex justify-center"> {/* Buttons */}
          <button type="button" className="relative inline-flex items-center justify-center
                                          rounded-md px-8 py-2 text-white bg-black
                                          hover:text-grey-400 focus:outline-none focus:ring-2
                                          focus:ring-inset focus:ring-white"
                                          aria-controls="mobile-menu" aria-expanded="false">Apply to E1</button>
          <button type="button" className="relative inline-flex items-center justify-center
                                          rounded-md px-8 py-2 text-gray-700 hover:bg-black
                                          hover:text-white focus:outline-none focus:ring-2
                                          focus:ring-inset focus:ring-white ml-6"
                                          aria-controls="mobile-menu" aria-expanded="false">See Projects</button>
        </div>
        <div className="py-28"></div>

        {/* Socials (for large screens) */}
        <div className="hidden md:flex flex-row">
          <div className="sm:basis-1/5">
          
          </div>
          <div className="sm:basis-3/5">
            <div className="flex flex-row justify-center">
            <div className="px-6">
                  <a href="https://www.youtube.com/@Frontera-expeditions" target="none">
                    <Image src={YT} alt={"YT"} className="justify-center h-14 w-auto"/>
                  </a>
            </div>
            <div className="px-6">
              <a href="https://www.x.com/" target="none">
                <Image src={Twitter} alt={"TwitterLogo"} className="justify-center h-14 w-auto"/>
              </a>
            </div>
            <div className="px-6">
                <a href="https://www.linkedin.com/company/frontera-expeditions/posts/" target="none">
                  <Image src={LinkedIn} alt={"LogoBlack"} className="justify-center h-14 w-auto"/>
                </a>
            </div>
            <div className="px-6">
              <a href="https://www.instagram.com/frontera.official/" target="none">
                  <Image src={Instagram} alt={"InstaLogo"} className="justify-center h-14 w-auto"/>
              </a> 
            </div>
            </div>
          </div>
          <div className="sm:basis-1/5">
          
          </div>
        </div>

        {/* Mobile socials */}
        <div className="md:hidden flex-auto content-center">
          <div className="py-6">
                <a href="https://www.youtube.com/@Frontera-expeditions" target="none">
                  <Image src={YT} alt={"YT"} className="justify-center mx-auto h-14 w-auto"/>
                </a>
          </div>
          <div className="py-6">
            <a href="https://www.x.com/" target="none">
              <Image src={Twitter} alt={"TwitterLogo"} className="justify-center mx-auto h-14 w-auto"/>
            </a>
          </div>
          <div className="py-6">
              <a href="https://www.linkedin.com/company/frontera-expeditions/posts/" target="none">
                <Image src={LinkedIn} alt={"LinkedIn"} className="justify-center mx-auto h-14 w-auto"/>
              </a>
          </div>
          <div className="py-6">
            <a href="https://www.instagram.com/frontera.official/" target="none">
                <Image src={Instagram} alt={"InstaLogo"} className="justify-center mx-auto h-14 w-auto"/>
            </a> 
          </div>
        </div>
        <div className="py-28"></div>

      </div>
    </div>
  );
}
