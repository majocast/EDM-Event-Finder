import React from 'react';
import Card from 'react-bootstrap/Card';
import HomeLanding from '../assets/homeLanding.json';
import Lottie from 'lottie-react';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Home = (props) => {
  const data = props.myData;
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
          <h2>Find Your Next Event</h2>
        </div>
      </div>
      <div className='next4Container'>
        <h1>Next Up!</h1>
        <Row className='nextFour'>
          {data.data.slice(0,4).map(item => {
            return (
              <Col>
                <Card style={{ width: '100%', height: '100%', backgroundColor: 'black', color:'bisque' }}>
                  <Card.Img variant="top" src={item.photo} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        {item.location}
                        <br />
                        {item.date}
                    </Card.Text>
                    <Button variant="primary" href={item.link} target='_blank'>View Tickets</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default Home;
