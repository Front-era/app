import axios from "axios";
import { useEffect, useState } from "react";
import "../app/globals.css";
import Landing from "./landing";

export default function Home() {
  return (<Landing/>)

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
      <div className="bg-blue-500 text-white p-4">Hello Tailwind!</div>

      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
