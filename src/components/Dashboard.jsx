import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const words = JSON.parse(localStorage.getItem('words')) || []; // Fetch words from localStorage
  const navigate = useNavigate();

  const handleWordClick = (id) => {
    navigate(`/word/${id}`); // Navigate to the Word component with the word's ID
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Word List</h1>
      {words.length > 0 ? (
        <ul className="space-y-2">
          {words.map((word) => (
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
