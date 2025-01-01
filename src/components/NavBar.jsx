import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for responsive menu toggle
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;
  const token = localStorage.getItem('token');
  const words = JSON.parse(localStorage.getItem('words')) || [];

  if (!token) return null;

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const word = words.find((word) => word.word === searchInput);
    setSearchResult(word);
  };

  // Handle click on the search result word to navigate to the Word component
  const handleWordClick = () => {
    navigate('word/' + searchResult._id);
    setSearchResult('');
    setSearchInput('');
  };

  if (current === '/') return <div></div>;

  return (
    <nav className="bg-blue-600 w-full shadow-md justify-center items-center space-x-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/dashboard" className="text-white text-xl font-bold">
          Words
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-2xl lg:hidden focus:outline-none"
        >
          ☰
        </button>

        {/* Menu Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute lg:relative top-16 lg:top-0 left-0 lg:left-auto bg-blue-600 w-full lg:w-auto lg:flex lg:items-center lg:space-x-4 transition-all duration-300`}
        >
          <Link
            to="/add"
            className="block lg:inline-block text-white text-lg font-semibold px-4 py-2 lg:px-2 hover:bg-blue-700"
          >
            Add Word
          </Link>
          <Link
            to="/test"
            className="block lg:inline-block text-white text-lg font-semibold px-4 py-2 lg:px-2 hover:bg-blue-700"
          >
            Test
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center space-x-2 lg:space-x-4 p-4 lg:p-0"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-2 py-1 rounded-lg focus:outline-none w-full lg:w-auto"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-2 py-1 rounded-lg hover:bg-gray-100 hover:scale-105"
            >
              Search
            </button>
          </form>

          {/* Logout Button */}
          <button
            className="block lg:inline-block text-gray-300 bg-yellow-600 px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('words');
              navigate('/');
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Display Word Search Result */}
      {searchResult && (
        <div className="absolute top-16 bg-white text-black p-4 rounded shadow-md w-3/4 lg:w-1/2 mx-auto">
          <p
            className="font-semibold text-lg cursor-pointer hover:underline"
            onClick={() => handleWordClick()}
          >
            {searchResult.word}
          </p>
        </div>
      )}
    </nav>
  );
};
export default Navbar;