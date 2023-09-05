import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Home = (props) => {
  const data = props.myData;
  return (
    <div className='home'>
      <h1>Welcome!</h1>
      <div className='filter'>
        <h1>Filter</h1>
      </div>
    </div>
  )
}

export default Home;