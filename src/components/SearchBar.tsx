import React, { useState } from 'react';

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search' }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border px-4 py-2 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
