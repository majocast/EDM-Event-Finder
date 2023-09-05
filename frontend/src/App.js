import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from './assets/loadingAnimation.json';
import NavBar from './components/NavBar';
import Event from './components/Event';
import Home from './pages/Home';
import Account from './pages/Account';
import Events from './pages/Events';

function App() {
  const [data, setData] = useState();
  const routes = [
    {path: '/', component: Home, myData: data},
    {path: '/events', component: Events, myData: data},
    {path: '/account', component: Account, myData: data},
  ];

  useEffect(() => {
    try {
      axios.post('http://localhost:5000/load')
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }

  }, [])

  if(!data) {
    return (
      <div className='loadingScreen'>
        <h1>event scraper</h1>
        <Lottie
          id='loadingAnimation'
          animationData={loadingAnimation} 
          loop
          autoplay
        />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <div className='page'>
          <Routes>
            {routes.map((route, index) => {
              return (<Route key={route.path} path={route.path} element={<route.component myData={route.myData}/>} />)
            })}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
