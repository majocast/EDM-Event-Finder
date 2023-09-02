import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from './assets/loadingAnimation.json';
import NavBar from './components/NavBar';
import Event from './components/Event';

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
  const eventInstance = new Event('nghtmre', 'jan 1, 2024', 'here', 1234);

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
        <p>{eventInstance.display()}</p>
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
