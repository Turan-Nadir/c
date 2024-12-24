import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;
  const token = localStorage.getItem('token');
  const words = JSON.parse( localStorage.getItem('words'));
  if (!token) return null;
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const word = words.find((word)=>word.word===searchInput)
    
    setSearchResult(word);
  };
  // Handle click on the search result word to navigate to the Word component
  const handleWordClick = () => {
    navigate('word/' + searchResult._id);
    setSearchResult(''); // Clear search results
    setSearchInput(''); // Optionally clear the input field as well
  };
  if (current === '/') return <div></div>;
  return (
    <nav className="bg-blue-600 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/dashboard" className="text-white text-xl font-bold">
          Words
        </Link>
        <Link to="/add" className="text-white text-xl font-bold">
          Add word
        </Link>
        <Link to="/test" className="text-white text-xl font-bold">
          Test
        </Link>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-2 py-1 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-1 py-1 rounded-lg hover:bg-gray-100 hover:scale-105"
          >
            Search
          </button>
        </form>

        {/* Logout Button */}
        <button
          className="h-fit w-fit p-2 m-3 border-2 rounded-lg border-red-500 text-gray-300 hover:scale-105"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('words');
            navigate('/');
          }}
        >
          Log Out
        </button>

        {/* Display Word Search Result */}
        {searchResult && (
          <div className="absolute top-16 bg-white text-black p-4 rounded shadow-md w-1/2">
            <p
              className="font-semibold text-lg cursor-pointer hover:underline"
              onClick={() => handleWordClick()} // Pass the whole result to Word component
            >
              {searchResult.word}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;