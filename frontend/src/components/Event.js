import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Event = (params) => {
  const pageLocation = useLocation();
  const [saved, setSaved] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, date, location, link, photo] = params.data;
  const [isDeleted, setIsDeleted] = useState(false);
  const inSaved = params.inSaved;

  useEffect(() => {
    if(localStorage.getItem('email')) {
      setLoggedIn(true);
      if(inSaved) {
        setSaved(true);
      }
    } else {
      setLoggedIn(false);
    }
  }, []);

  const toggleSaved = async () => {
    const email = localStorage.getItem('email');
    if(!saved) {
      console.log('in false saved');
      ////${process.env.REACT_APP_EEF_SERVER}
      await axios.post(`http://localhost:5000/event/${email}`,{ 
        name, location, date, link, photo 
      })
      .then((res) => {
        if(res.data !== 'added') {
          console.log('error in saving event');
        } else {
          console.log('successfully added');
        }
      })
    } else {
      ////${process.env.REACT_APP_EEF_SERVER}
      await axios.delete(`http://localhost:5000/event/${email}`,{
        data: { name, location, date, link, photo }
      })
      .then((res) => {
        if(res.data !== 'deleted') {
          console.log('error in removing event');
        } else {
          console.log('successfully removed');
          if(pageLocation.pathname === '/account') {
            setIsDeleted(true);
          }
        }
      })
    }
    setSaved(!saved);
  }

  if(isDeleted) {
    return null;
  }
  
  return (
    <Card style={{ width: '100%', height: '100%', backgroundColor: 'black', color:'bisque' }}>
      <Card.Img variant="top" src={photo} loading='lazy'/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {location}
          <br />
          {date}
        </Card.Text>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button className='ticketButton' variant="primary" href={link} target='_blank'>View Tickets</Button>
          {loggedIn ? (saved ? <BookmarkIcon style={{ margin: '0 0.5rem' }} onClick={toggleSaved} variant='primary'/> : <BookmarkBorderIcon style={{ margin: '0 0.5rem' }} onClick={toggleSaved} variant='primary'/>) : null}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Event;