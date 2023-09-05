import React from 'react';
import Event from '../components/Event';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Events = (props) => {
  const data = props.myData;
  return (
    <Row>
      {data.data.map((item, index) => {
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
  )
}

export default Events;