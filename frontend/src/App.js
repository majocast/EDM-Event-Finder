import React, { useState, useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Lottie from 'lottie-react';
import loadingAnimation from './assets/loadingAnimation.json';
import waveHaikei from './assets/wave-haikei.svg';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import Register from './pages/Register';
import Account from './pages/Account';

function App() {
  const routes = [
    {path: '/', component: Home},
    {path: '/events', component: Events},
    {path: '/account', component: Account},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
  ];

  return (
    <BrowserRouter>
      <img className='background' src={waveHaikei} alt='Wave Haikei'/>
      <div className='App'>
        <NavBar />
        <div className='page'>
          <Routes>
            {routes.map((route, index) => {
              return (<Route key={route.path} path={route.path} element={<route.component />} />)
            })}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
