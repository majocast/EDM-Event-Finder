import React, { useState } from 'react';
import Event from '../components/Event';
import Filter from '../components/Filter';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Events = (props) => {
  const data = props.myData;
  const [filteredData, setFilteredData] = useState(data.data);

  const handleDataFiltered = (filteredData) => { 
    setFilteredData(filteredData); 
  }

  return (
    <Container className='events'>
      <Row>
        <Col sm={4} className='filterCol'>
          <Filter data={data.data} onDataFiltered={handleDataFiltered}/>
        </Col>
        <Col sm={8} className='eventTable'>
          <Row>
            {filteredData.map((item, index) => {
              const event = new Event(item.title, item.date, item.location, item.link, item.photo, index);
              return (
                <Col key={index} xs={12} sm={6} md={4}>
                  {event.display()}
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Events;