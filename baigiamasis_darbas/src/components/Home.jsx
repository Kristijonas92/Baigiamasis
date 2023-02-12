import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import GreatPosts from '../img/GreatPosts.png'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">LogIn</Link></li>
            <li><Link to="#">Contact</Link></li>
            {isLoggedIn && (
              <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
            )}
          </ul>
        </nav>
        <img src={GreatPosts} alt="Logo" />
        <h1>GreatPosts</h1>
      </header>
      {isLoggedIn && (
        <Post />
      )}
      <footer>
        <p>Copyright &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default Home;
