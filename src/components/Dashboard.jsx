import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const words = JSON.parse(localStorage.getItem('words')) || []; // Fetch words from localStorage
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filteredWords, setFilteredWords] = useState(words);
  const navigate = useNavigate();

  const handleWordClick = (id) => {
    navigate(`/word/${id}`); // Navigate to the Word component with the word's ID
  };

  const handleFilterChange = (e) => {
    const criteria = e.target.value;
    setFilterCriteria(criteria);

    let sortedWords = [];
    switch (criteria) {
      case 'a-z':
        sortedWords = [...words].sort((a, b) => a.word.localeCompare(b.word));
        break;
      case 'z-a':
        sortedWords = [...words].sort((a, b) => b.word.localeCompare(a.word));
        break;
      case 'word':
        sortedWords = [...words].sort((a, b) => a.word.localeCompare(b.word));
        break;
      case 'translation':
        sortedWords = [...words].sort((a, b) => a.translation.localeCompare(b.translation));
        break;
      case 'type':
        sortedWords = [...words].sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'category':
        sortedWords = [...words].sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'timestamp':
        sortedWords = [...words].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      default:
        sortedWords = words;
    }
    setFilteredWords(sortedWords);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Word List</h1>

      {/* Filter Bar */}
      <div className="flex justify-center mb-4">
        <select
          value={filterCriteria}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded-lg focus:outline-none bg-white text-blue-600"
        >
          <option value="">Filter By</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="word">Word</option>
          <option value="translation">Translation</option>
          <option value="type">Type</option>
          <option value="category">Category</option>
          <option value="timestamp">Timestamp</option>
        </select>
      </div>

      {filteredWords.length > 0 ? (
        <ul className="space-y-2">
          {filteredWords.map((word) => (
            <li
              key={word._id}
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={() => handleWordClick(word._id)}
            >
              {word.word}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No words available.</p>
      )}
    </div>
  );
};

export default Dashboard;
