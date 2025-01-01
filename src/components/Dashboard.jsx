import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const words = JSON.parse(localStorage.getItem('words')) || []; // Fetch words from localStorage
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filterDate, setFilterDate] = useState('');
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

  const handleDateFilter = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (selectedDate) {
      const filteredByDate = words.filter((word) => {
        const wordDate = new Date(word.timestamp).toISOString().split('T')[0]; // Extract date part
        return wordDate === selectedDate;
      });
      setFilteredWords(filteredByDate);
    } else {
      setFilteredWords(words); // Reset filter if no date selected
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Word List</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap border border-gray-600 rounded-lg justify-center p-4 m-4 items-center gap-4">
        <div className="text-xl text-gray-800">Number of words: {filteredWords.length}</div>

        <select
          value={filterCriteria}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded-lg focus:outline-none bg-white text-blue-600"
        >
          <option value="">Sort By</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="translation">Translation</option>
          <option value="type">Type</option>
          <option value="category">Category</option>
          <option value="timestamp">Timestamp</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={handleDateFilter}
          className="px-2 py-1 rounded-lg focus:outline-none bg-white text-blue-600"
        />
      </div>

      {/* Word List */}
      {filteredWords.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredWords.map((word) => (
            <li
              key={word._id}
              className="flex flex-col border rounded-lg border-yellow-600 p-4 cursor-pointer"
              onClick={() => handleWordClick(word._id)}
            >
              <div className="text-lg text-blue-800">{word.word}</div>
              <div className="text-sm text-gray-700">{word.translation}</div>
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
