import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from './siteConfig';

const AddWord = () => {
  const [formData, setFormData] = useState({
    word: '',
    category: '',
    translation: '',
    image: '',
    type: 'noun',
    definition: '',
    example: '',
    timestamp:''
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const examples = formData.example.split(',').map((item) => item.trim());
      const token =JSON.parse( localStorage.getItem('token'));

      const response = await fetch(siteConfig.links.add, {
        method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          word:formData.word, 
          translation:formData.translation, 
          category:formData.category, 
          type:formData.type, 
          definition:formData.definition, 
          image:formData.image, 
          timestamp:formData.timestamp,
          examples, token}),
      });

      if (!response.ok) {
        throw new Error('Failed to save the word');
      }

      const savedWord = await response.json(); // Get the saved word from the response
      const existingWords = JSON.parse(localStorage.getItem('words')) || [];
      const updatedWords = [...existingWords, savedWord]; // Add the new word to the existing words
      localStorage.setItem('words', JSON.stringify(updatedWords)); // Save back to localStorage

      setMessage('Word added successfully!');
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect to dashboard after a delay
    } catch (error) {
      console.error('Error adding word:', error);
      setMessage('Failed to add word');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Word</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Word */}
        <div>
          <label className="block text-gray-700">Word:</label>
          <input
            type="text"
            name="word"
            value={formData.word}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Translation */}
        <div>
          <label className="block text-gray-700">Translation:</label>
          <input
            type="text"
            name="translation"
            value={formData.translation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Image URL */}
        <div>
          <label className="block text-gray-700">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-gray-700">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Type */}
        <div>
          <label className="block text-gray-700">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adverb">Adverb</option>
            <option value="adjective">Adjective</option>
          </select>
        </div>
        {/* Definition */}
        <div>
          <label className="block text-gray-700">Definition:</label>
          <input
            type="text"
            name="definition"
            value={formData.definition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">timeStamp:</label>
          <input
            type="date"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Example */}
        <div>
          <label className="block text-gray-700">Example (comma-separated):</label>
          <input
            type="text"
            name="example"
            value={formData.example}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Word
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};
export default AddWord;