import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loadingAnimation.json';
import Filter from '../components/Filter';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Events = () => {
  const [pageNum, setPageNum] = useState(2);
  const [canPull, setCanPull] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); //add loading state for events

  const pullInfo = async (currEmail) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_EEF_SERVER}/accountInfo/${currEmail}`);
      setSavedData(res.data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }
  
  useEffect(() => {
    if((localStorage.getItem('email') !== null)) {
      setLoggedIn(true);
      pullInfo(localStorage.getItem('email'));
    } else {
      setLoggedIn(false);
    }
  }, [])

  useEffect(() => {
    setLoadingMore(false);
  }, [filteredData])

  const pullMore = async () => {
    try {
      setLoadingMore(true);
      const response = await axios.post(`${process.env.REACT_APP_EEF_SERVER}/load`, { pageNum })
      if(response.data.length % 50 !== 0 || response.data.length === 0) {
        setCanPull(false);
      }
      setPageNum(pageNum + 1);
      setFilteredData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  const {data, isLoading, isError} = useQuery('loadData', async () => {
    const response = await axios.post(`${process.env.REACT_APP_EEF_SERVER}/load`);
    setFilteredData(response.data);
    return response.data
  })

  //mutation using useMutation to add more data
  const { isLoadingMore, isError: isMoreError } = useMutation(pullMore, {
    onMutate: () => {
      <div className='loadingScreen'>
        <h1>loading events</h1>
        <Lottie
          id='loadingAnimation'
          animationData={loadingAnimation} 
          loop
          autoplay
        />
      </div>
    },
    onError:(error) => {
      console.error('Error loading more data: ', error);
    },
    onSettled: () => {
      
    }
  })

  if(isLoading) {
    return (
      <div className='loadingScreen'>
        <h1>loading events</h1>
        <Lottie
          id='loadingAnimation'
          animationData={loadingAnimation} 
          loop
          autoplay
        />
      </div>
    )
  }

  if(isError) {
    return <div>Error loading data</div>
  }
  
  const handleDataFiltered = (filteredData) => { 
    setFilteredData(filteredData);
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
                style={{width:'75px', height:'75px'}}
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
