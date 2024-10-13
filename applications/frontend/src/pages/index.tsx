import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<{ name: string }[]>([]);

  useEffect(() => {
    // Call the API route from the NestJS backend
    axios.get('http://localhost:3000/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
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
}

