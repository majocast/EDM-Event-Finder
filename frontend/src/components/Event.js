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
    console.log(this.name, this.date, this.location, this.eventID);
  }
}

export default Event;