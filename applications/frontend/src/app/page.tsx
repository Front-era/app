// Homepage

"use client"; // Mark this as a client component

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Frontera</h1>
        <p className="text-2xl mt-4 font-light">Your Journey, Our Frontier</p>
      </div>

      {/* User List */}
      <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6">Naruto Uzumaki</h2>
        {users.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <li
                key={index}
                className="py-3 flex items-center justify-between text-lg font-medium"
              >
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Active User</p>
        )}
      </div>

      {/* Button to Navigate to OS */}
      <div className="mt-10">
        <Link href="/os">
          <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-3 px-8 rounded-full shadow-lg text-lg font-semibold">
            Go to OS
          </button>
        </Link>
      </div>
    </div>
  );
}
