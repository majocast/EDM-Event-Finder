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
      await axios.post(`${process.env.REACT_APP_EEF_SERVER}/event/${email}`,{ 
        name, location, date, link, photo 
      })
      .then((res) => {
        //checking if add was successful
        if(res.status !== 200) {
          console.log('error in saving event');
        }
      })
    } else {
      await axios.delete(`${process.env.REACT_APP_EEF_SERVER}/event/${email}`,{
        data: { name, location, date, link, photo }
      })
      .then((res) => {
        if(res.status !== 200) {
          alert('error in removing event');
        } else {
          if(pageLocation.pathname === '/account') {
            setSaved(false);
          }
        }
      })
    }
    setSaved(!saved);
  }

  if(!saved && pageLocation.pathname === '/account') {
    return null;
  }
  
  return (
    <Card style={{ width: '100%', height: '100%', backgroundColor: 'black', color:'bisque', border:'2px solid bisque', borderRadius: '25px'}}>
      <Card.Img variant="top" src={photo} loading='lazy' style={{borderTopLeftRadius: '23px', borderTopRightRadius: '23px'}}/>
      <Card.Body>
        <Card.Title style={{fontWeight: '700'}}>{name}</Card.Title>
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