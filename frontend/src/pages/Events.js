import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import Filter from '../components/Filter';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Events = (props) => {
  const data = props.myData;
  const [filteredData, setFilteredData] = useState(data.data);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleDataFiltered = (filteredData) => { 
    setFilteredData(filteredData); 
  }

  useEffect(() => {
    if(localStorage.getItem('email') !== undefined) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [])

  console.log(loggedIn);
  return (
    <Container className='events'>
      <Row>
        <Col sm={4} className='filterCol'>
          <Filter data={data.data} onDataFiltered={handleDataFiltered}/>
        </Col>
        <Col sm={8} className='eventTable'>
          <Row>
            {filteredData.map((item, index) => {
              const event = [item.title, item.date, item.location, item.link, item.photo];
              return (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Event data={event} />
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