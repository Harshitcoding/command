// Search.tsx
'use client';

import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-20 mt-10">
        <div className="text-3xl font-semibold text-red-400">Command</div>
        <input
          className="border rounded-lg pl-10 pt-2 pb-2 w-full sm:w-auto text-black"
          type="text"
          placeholder="search for the command"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>
    </div>
  );
}

export default Search;
