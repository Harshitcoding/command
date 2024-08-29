// // Landing.tsx
// 'use client';

// import axios from 'axios';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import Search from '../Search/page';

// interface Command {
//   id: number;
//   imageUrl: string;
//   heading: string;
//   description: string;
// }

// function Landing() {
//   const [commands, setCommands] = useState<Command[]>([]);
//   const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/api/commandCreation')
//       .then((response) => {
//         setCommands(response.data.body);
//         setFilteredCommands(response.data.body);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleSearch = (query: string) => {
//     const filtered = commands.filter((command) =>
//       command.heading.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredCommands(filtered);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center space-y-8 ml-10">
//   <Search onSearch={handleSearch} />
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//     {isLoading ? (
//       <div className="col-span-full text-center text-2xl font-bold">Loading...</div>
//     ) : (
//       filteredCommands.map((command) => (
        
//         <div key={command.id} className="flex flex-col items-center space-y-4">
//           <Link href={`/CommandPost/${command.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
//           <div className="w-full">
//             <img src={command.imageUrl} alt={command.heading} className="w-full h-64 object-cover rounded-lg shadow-md" />
//           </div>
//           <div className="text-2xl font-bold">{command.heading}</div>
          
//             <div className='w-5'>
//             <img src='https://firebasestorage.googleapis.com/v0/b/command-b7c44.appspot.com/o/images%2FScreenshot%202024-07-05%20211630.png?alt=media&token=4b6fc7bf-b96e-4974-bd4e-77901889fc5e'/>
//             </div>
//           </Link>
//         </div>
//       ))
//     )}
//   </div>
// </div>

//   );
// }

// export default Landing;
// Landing.tsx
'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Command {
  id: number;
  imageUrl: string;
  heading: string;
  description: string;
}

function Landing() {
  const [commands, setCommands] = useState<Command[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/commandCreation')
      .then((response) => {
        setCommands(response.data.body);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 ml-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {commands.map((command) => (
          <div key={command.id} className="flex flex-col items-center space-y-4">
            <Link href={`/CommandPost/${command.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
              <div className="w-full">
                <img src={command.imageUrl} alt={command.heading} className="w-full h-64 object-cover rounded-lg shadow-md" />
              </div>
              <div className="text-2xl font-bold">{command.heading}</div>
              <div className='w-5'>
                <img src='https://firebasestorage.googleapis.com/v0/b/command-b7c44.appspot.com/o/images%2FScreenshot%202024-07-05%20211630.png?alt=media&token=4b6fc7bf-b96e-4974-bd4e-77901889fc5e' />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
