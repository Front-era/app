/*
import axios from 'axios';
import { useEffect, useState } from 'react';
*/

import Image from "next/image";
// import Background from "../assets/background.png";
import Planet from "../assets/background-planet.png";
import Surface from "../assets/background-surface.png";
import Logo from "../assets/logo.png";

export default function Home() {
  /*
  const [users, setUsers] = useState<{ name: string }[]>([]);

  useEffect(() => {
    // Call the API route from the NestJS backend
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
  */

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] bg-black">
      <div className="w-full flex aspect-[1387/1384]">
        <Image
          src={Planet}
          alt={"A look of Frontera from space."}
          className="object-fill w-full absolute"
        ></Image>
        <div className="w-full absolute aspect-[1387/1384]">
          <Image
            src={Logo}
            alt={"Logo"}
            className="absolute left-[17.5%] top-[17%] w-[40%]"
          ></Image>
          <h1 className="text-sm text-white absolute left-[57.5%] top-[26.5%] xl:text-8xl sm:text-3xl">
            Coming soon
          </h1>
          <h2 className="text-xs text-white absolute left-[55%] top-[33%] font-thin italic xl:text-4xl sm:text-xl">
            Your Journey, Our Frontier.
          </h2>
        </div>
      </div>
      <div className="w-full flex aspect-[1387/1384]">
        <Image
          src={Surface}
          alt={"A look of Frontera from the surface."}
          className="object-fill w-full absolute"
        ></Image>
        <div className="w-full absolute aspect-[1387/1384] flex items-center flex-col">
          <h1 className="text-sm xl:text-9xl mt-[25%] text-white sm:text-5xl">
            Population
          </h1>
          <h2 className="text-xs text-center relative font-medium text-sky-400 mt-[7.5%] xl:text-9xl sm:text-4xl">
            1000
          </h2>
        </div>
      </div>
    </div>
  );
}
