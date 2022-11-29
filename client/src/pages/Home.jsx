import React from 'react';
import Login from './Login/Login';
import Profile from './Profile/Profile';

const Home = () => {
  const isAuth = localStorage.getItem('name');
  return isAuth ? <Profile /> : <Login />;
};

export default Home;
