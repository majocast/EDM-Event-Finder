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
      <div>
        <h1>This is an event class</h1>
      </div>
    )
  }
}

export default Event;