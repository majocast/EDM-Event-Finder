import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Event {
  name;
  date;
  location;
  eventID;

  constructor(name, date, location, eventID) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.eventID = eventID;
  }

  display = () => {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.photo} />
        <Card.Body>
          <Card.Title>{this.title}</Card.Title>
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