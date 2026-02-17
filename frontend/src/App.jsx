import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./herosection";
import Post from "./post";
import Login from './Login';
import Register from './Register';
import Profile from './profile';

const App = () => {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/create" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;