import React from 'react';
import Event from '../components/Event';
import { Row, Col } from 'react-bootstrap';

const Events = (props) => {
  const data = props.myData;
  return (
    <div className='events'>
      <div className='filter'>
        <h1>Filter</h1>
      </div>
      <div>
        <Row>
          {data.data.map((item, index) => {
            const event = new Event(item.title, item.date, item.location, item.link, item.photo, index);
            return (
              <Col key={index} xs={12} sm={6} md={4}>
                {event.display()}
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default Events;