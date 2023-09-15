import React from 'react';
import Card from 'react-bootstrap/Card';
import HomeLanding from '../assets/homeLanding.jpg';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Home = (props) => {
  const data = props.myData;
  console.log(data);
  return (
    <div className='home'>
      <div className='imageContainer'>
        <img src={HomeLanding} alt='Event'/>
        <h1>Find Your Next California Event</h1>
      </div>
      <h2>Next 4 Events</h2>
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
  )
}

export default Home;