import React from 'react';
import HomeLanding from '../assets/homeLanding.json';
import Lottie from 'lottie-react';

const Home = () => {
  return (
    <div className='home'>
      <div className='imageContainer'>
        <Lottie
          id='homeLanding'
          animationData={HomeLanding} 
          loop
          autoplay
        />
        <div>
          <h1>EDM Event Finder</h1>
          <h3>Find Your Next Event</h3>
        </div>
      </div>
      
    </div>
  )
}

export default Home;
