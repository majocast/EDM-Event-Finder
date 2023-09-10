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
  const inSaved = params.inSaved;

  useEffect(() => {
    console.log(localStorage.getItem('email'));
    if(localStorage.getItem('email')) {
      setLoggedIn(true);
      if(inSaved) {
        setSaved(true);
      }
    } else {
      setLoggedIn(false);
      setSaved(false);
    }
  }, [pageLocation.pathname]);

  const toggleSaved = async () => {
    const email = localStorage.getItem('email');
    if(!saved) {
      await axios.post(`http://localhost:5000/event/${email}`,{ 
        name, location, date, link, photo 
      })
      .then((res) => {
        if(res.data !== 'added') {
          alert('error in saving event');
        } else {
          alert('successfully added');
        }
      })
    } else {
      
    }
    setSaved(!saved);
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
        <Button variant="primary" href={link} target='_blank'>View Tickets</Button>
        {loggedIn ? (saved ? <BookmarkIcon style={{ margin: '0 0.5rem' }} onClick={toggleSaved} variant='primary'/> : <BookmarkBorderIcon style={{ margin: '0 0.5rem' }} onClick={toggleSaved} variant='primary'/>) : null}
      </Card.Body>
    </Card>
  )
}

export default Event;