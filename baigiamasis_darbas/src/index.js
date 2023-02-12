import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostContextProvider } from './context/PostContext';
import { UserProvider } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </UserProvider>
  </BrowserRouter>
);