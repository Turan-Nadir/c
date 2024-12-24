import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { siteConfig } from './siteConfig';

const Word = () => {
  const { id } = useParams();
  const [wordDetails, setWordDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const words = JSON.parse(localStorage.getItem('words')) || [];
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => { 
    const fetchWordDetails = () => {
      const word = words.find((word) => word._id === id);
      if (word) {
        setWordDetails(word);
      } else {
        setError('Word not found.');
      }
    };
    fetchWordDetails();
    // eslint-disable-next-line
  }, [id]); // eslint-disable-next-line

  const handleDelete = async () => {
    if (!token) {
      setError('You must be logged in to delete a word.');
      return;
    }
    try {
      const response = await fetch(siteConfig.links.add, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, token }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete word.');
      }

      // Update localStorage after deletion
      localStorage.removeItem('words');
      const updatedWords = words.filter((word) => word._id !== id);
      localStorage.setItem('words', JSON.stringify(updatedWords));

      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Error deleting word:', error);
      setError(error.message);
    }
  };

  if (!wordDetails) {
    return (
      <div className="mt-10 p-6 h-screen w-screen flex items-center justify-center">
        {error ? <div className="text-red-500">{error}</div> : <div>Loading...</div>}
      </div>
    );
  }

  return (
    <div className="mt-10 p-6 h-screen w-screen flex flex-col items-center justify-center space-y-5">
      {error && <div className="text-red-500">{error}</div>}
      <h1 className="text-2xl font-bold">{wordDetails.word}</h1>
      {wordDetails?.image && (
        <img
          src={wordDetails.image}
          alt={wordDetails.word}
          height={400}
          width={400}
          className="my-4"
        />
      )}
      <h2 className="text-xl">{wordDetails.translation}</h2>
      <p>
        <strong>Category:</strong> {wordDetails.category}
      </p>
      <p>
        <strong>Type:</strong> {wordDetails.type}
      </p>
      <div>
        <strong>Definition:</strong> {wordDetails.definition}
      </div>
      <div>
        <strong>Examples:</strong>
        {wordDetails.examples?.length > 0 ? (
          <ul className="list-disc list-inside">
            {wordDetails.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        ) : (
          <p>No examples available.</p>
        )}
      </div>
      <button
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete Word
      </button>
    </div>
  );
};

export default Word;
