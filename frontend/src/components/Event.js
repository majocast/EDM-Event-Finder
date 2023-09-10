import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Event = (params) => {
  const [saved, setSaved] = useState(false);
  const [name, date, location, link, photo] = params.data;

  const toggleSaved = () => {
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
        {saved ? <BookmarkIcon onClick={toggleSaved} variant='primary'/> : <BookmarkBorderIcon onClick={toggleSaved} variant='primary'/>}
      </Card.Body>
    </Card>
  )
}

export default Event;