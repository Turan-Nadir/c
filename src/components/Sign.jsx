import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { siteConfig } from './siteConfig';
const Sign = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ username: '',password: ''});
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody ={username: formData.username, password: formData.password};
    try {
      const response = await fetch( siteConfig.links.signin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      if (data.token) {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('words', JSON.stringify(data.words));
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <div className="flex flex-col w-[90%] h-fit max-w-md p-5 mx-auto shadow-lg border rounded-lg backdrop-blur-md">
        <div className="flex flex-col items-center mb-4">
          <img src="/logo.png" className="m-3" alt="Logo" width={50} height={50} />
          <h2 className="text-yellow-500">
            MY  <span className="text-cyan-500">WORDS</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type={isVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="text-sm text-blue-500"
                onClick={toggleVisibility}
              >
                {isVisible ? 'Hide Password' : 'Show Password'}
              </button>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" 
          > Sign In </button>
        </form>
      </div>
  );
};
export default Sign;