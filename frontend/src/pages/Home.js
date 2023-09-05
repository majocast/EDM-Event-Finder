import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Home = (props) => {
  const data = props.myData;
  return (
    <div className='home'>
      <h1>Welcome!</h1>
      <Row>
        {data.data.map((item, index) => {
          console.log(data.data);
          return (
            <Col key={index} xs={12} sm={6} md={4}>
              <Card style={{ width: '18rem' }}>
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