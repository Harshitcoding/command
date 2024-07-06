'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

interface Command {
  id: string;
  imageUrl: string;
  heading: string;
  description: string;
}

const CommandDetails = () => {
  const [command, setCommand] = useState<Command | null>(null);

  useEffect(() => {
    const fetchCommand = async () => {
      try {
        const id = window.location.pathname.split('/').pop();
        const response = await axios.get<Command>(`http://localhost:3000/api/commandid/${id}`);
        setCommand(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommand();
  }, []);

  if (!command) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl">
        <img src={command.imageUrl} alt="Command" className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{command.heading}</h1>
          <p className="text-gray-700 text-xl" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(command.description) }} />
        </div>
      </div>
    </div>
  );
};

export default CommandDetails;