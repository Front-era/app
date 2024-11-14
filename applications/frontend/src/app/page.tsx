/*
import axios from 'axios';
import { useEffect, useState } from 'react';
*/

import Image from "next/image";
import Background from "../assets/background.png";
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
    <div className="relative items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Image
        src={Background}
        alt={"Background"}
        className="object-fill w-[100%] absolute"
      ></Image>
      <div className="w-full absolute aspect-video">
        <Image
          src={Logo}
          alt={"Logo"}
          className="absolute left-[17.5%] top-[30%] w-[40%]"
        ></Image>
        <h1 className="text-sm text-white absolute left-[57.5%] top-[47.5%] lg:text-8xl">
          Coming soon
        </h1>
        <h2 className="text-xs text-white absolute left-[55%] top-[57.5%] font-thin italic lg:text-4xl">
          Your Journey, Our Frontier.
        </h2>
      </div>
    </div>
  );
}
