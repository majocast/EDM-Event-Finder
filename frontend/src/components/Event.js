import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Event {
  name;
  date;
  location;
  link;
  photo;
  eventID;

  constructor(name, date, location, link, photo, eventID) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.link = link;
    this.photo = photo;
    this.eventID = eventID;
  }

  display = () => {
    return (
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'black', color:'bisque' }}>
        <Card.Img variant="top" src={this.photo} loading='lazy'/>
        <Card.Body>
          <Card.Title>{this.name}</Card.Title>
            <Card.Text>
              {this.location}
              <br />
              {this.date}
          </Card.Text>
          <Button variant="primary" href={this.link} target='_blank'>View Tickets</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Event;