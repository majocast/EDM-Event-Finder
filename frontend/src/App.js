import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from './assets/loadingAnimation.json';
import NavBar from './components/NavBar';

function App() {
  const [data, setData] = useState();
  const routes = [];

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
      <div className="App">
        <NavBar />
        <div>
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
