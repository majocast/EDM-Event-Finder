import React, {useState, useEffect} from "react";
import axios from "axios";
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loadingAnimation.json';
import { Row, Col } from 'react-bootstrap';
import Event from '../components/Event';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Account() {
  const location = useLocation();
  const history = useNavigate();
  const [saved, setSaved] = useState([]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, []);

  const pullInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/accountInfo/${email}`);
      setSaved(res.data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }

  useEffect(() => {
    if(email !== null) {
      pullInfo();
    }
  }, [email])

  const signOut = () => {
    localStorage.clear();
    history('/');
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
      </div>
      <h1>My Saved Events</h1>
      <div className="eventTable">
        {saved ? 
          <Row>
            {saved.map((item, index) => {
              const event = [item.eventname, item.eventdate, item.eventlocation, item.eventlink, item.eventphoto];
              console.log(event);
              return (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Event data={event} inSaved={true}/>
                </Col>
              )
            })}
          </Row>
        :
          <div>
            <Link to='/events'></Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Account;