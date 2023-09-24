import React, {useState, useEffect} from "react";
import axios from "axios";
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loadingAnimation.json';
import { Row, Col } from 'react-bootstrap';
import Event from '../components/Event';
import { Link, useNavigate } from 'react-router-dom';

function Account() {
  const history = useNavigate();
  const [saved, setSaved] = useState([]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, []);

  const pullInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_EEF_SERVER}/accountInfo/${email}`);
      setSaved(res.data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }

  useEffect(() => {
    if(email !== null) {
      pullInfo();
    }
  }, [email]);

  useEffect(() => {
    if(saved.length > 0) {
      const currentDate = new Date();
      saved.forEach((event) => {
        const eventDate = new Date(event.eventdate);
        //bind to backend to auto-delete past events
        if (eventDate < currentDate) {
          console.log("This event has passed");
        } else {
          console.log("This event has not passed");
        }
      })
    }
  }, [saved])

  const signOut = () => {
    localStorage.clear();
    history('/');
  }

  const deleteAcct = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_EEF_SERVER}/account/${email}`)
      .then((res) => {
        console.log(`Account deleted: ${res.data}`);
      })
      .catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }

  if(!email) {
    return (
      <div className='loadingScreen'>
        <h1>loading account</h1>
        <Lottie
          id='loadingAnimation'
          animationData={loadingAnimation} 
          loop
          autoplay
        />
      </div>
    )
  }

  return (
    <div className='account'>
      <div className='accountInfo'>
        <h2>{email}</h2>
        <Link onClick={signOut} to='/'>Log Out</Link>
        <Link className='deleteAcct' onClick={deleteAcct} to='/'>Delete</Link>
      </div>
      <div className="eventTable">
        {saved.length > 0 ? 
          <Row>
            <h1>My Saved Events</h1>
            {saved.map((item, index) => {
              const event = [item.eventname, item.eventdate, item.eventlocation, item.eventlink, item.eventphoto];
              return (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Event data={event} inSaved={true}/>
                </Col>
              )
            })}
          </Row>
        :
        <div className='eventsBtn'>
          <Link to='/events'>Visit Events Page!</Link>
        </div>
        }
      </div>
    </div>
  )
}

export default Account;
