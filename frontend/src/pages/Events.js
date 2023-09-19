import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loadingAnimation.json';
import Filter from '../components/Filter';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Events = (props) => {
  let data = props.myData.data;
  const [pageNum, setPageNum] = useState(2);
  const [canPull, setCanPull] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [savedData, setSavedData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // add loading state
  const [loadingMore, setLoadingMore] = useState(false); //add loading state for events

  const handleDataFiltered = (filteredData) => { 
    setFilteredData(filteredData);
  }

  useEffect(() => {
    if((localStorage.getItem('email') !== null)) {
      setLoggedIn(true);
      pullInfo(localStorage.getItem('email'));
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }, [])

  const pullInfo = async (currEmail) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_EEF_SERVER}/accountInfo/${currEmail}`);
      setSavedData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error fetching data: ", error);
      setIsLoading(false);
    }
  }

  const checkEvent = (event) => {
    const eventExists = savedData.some((dbEvent) => {
      return (
        dbEvent.eventname === event[0] &&
        dbEvent.eventdate === event[1] &&
        dbEvent.eventlocation === event[2] &&
        dbEvent.eventlink === event[3] &&
        dbEvent.eventphoto === event[4]
      );
    });
    return eventExists;
  }

  const pullMore = async () => {
    try {
      setLoadingMore(true);
      await axios.post(`${process.env.REACT_APP_EEF_SERVER}/load`, { pageNum })
      .then((response) => {
        if(response.data.length % 50 !== 0 || response.data.length === 0) {
          setCanPull(false);
        }
        setPageNum(pageNum + 1);
        setFilteredData([...filteredData, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    data = [...filteredData];
    setLoadingMore(false);
  }, [filteredData])

  if(isLoading) {
    return (
      <div className='loadingScreen'>
        <h1>loading events</h1>
        <Lottie
          style={{width:'50px', height:'50px'}}
          id='loadingAnimation'
          animationData={loadingAnimation} 
          loop
          autoplay
        />
      </div>
    )
  }

  return (
    <Container className='events'>
      <div>
        <div xs={12} sm={4} className='filterCol'>
          <Filter data={data} onDataFiltered={handleDataFiltered}/>
        </div>
        <div xs={12} sm={8} className='eventTable'>
          <Row>
            {filteredData.map((item, index) => {
              const event = [item.title, item.date, item.location, item.link, item.photo];
              let check = false;
              if(loggedIn) {
                check = checkEvent(event);
              }
              return (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Event data={event} inSaved={check} />
                </Col>
              )
            })}
            <div className='pullMore' xs={12} sm={6} md={4}>
              {canPull ? (loadingMore ? <Lottie
                id='loadingAnimation'
                animationData={loadingAnimation} 
                loop
                autoplay
              /> : <button onClick={pullMore}>Load More Events</button>) : null}
            </div>
          </Row>
        </div>
      </div>
    </Container>
  )
}

export default Events;
