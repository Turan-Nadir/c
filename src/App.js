import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sign from './components/Sign';
import Dashboard from './components/Dashboard';
import Word from './components/Word';
import AddWord from './components/Add';
import Test from './components/Test';
function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Sign/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/word/:id" element={<Word/>} />
          <Route path="/add" element={<AddWord/>} />
          <Route path="/test" element={<Test/>} />
          </Routes>
    </Router>
  );
}

export default App;
