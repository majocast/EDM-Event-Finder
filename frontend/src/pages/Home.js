import React from 'react';
import Card from 'react-bootstrap/Card';
import HomeLanding from '../assets/homeLanding.json';
import Lottie from 'lottie-react';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Home = (props) => {
  const data = props.myData.data;
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
          <h1>EDM Event Scraper</h1>
          <h3>Find Your Next Event</h3>
        </div>
      </div>
      
    </div>
  )
}

export default Home;
