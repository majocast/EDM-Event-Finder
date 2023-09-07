const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { Scraper } = require('./scraper.js');

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/load', async (req, res) => {
  try {
    const events = await Scraper();
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})

//ROUTES

//need to fix this to include passwords
//create an account
app.post('/create', async (req, res) => {
  //AWAIT
  try {
    console.log(req.body);
    const { email, pass } = req.body;
    const newAccount = await pool.query(
      "INSERT INTO accounts (email, pass) VALUES($1, $2) RETURNING *",
      [email, pass]
    );
    res.json(newAccount.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//get all saved events
app.get('/userEvents', async (req, res) => {
  try {
    const { accountID } = req.body;
    const allEvents = await pool.query(
      'SELECT * FROM events WHERE accountID = $1', 
      [accountID]
    );
    res.json(allEvents.rows);
  } catch (err) {
    console.log(err.message);
  }
})

/* JSON CONFIG INSERTION
{
    "accountID": 1
}
*/

//add an event
app.post('/addEvent', async (req, res) => {
  try {
    const { eventID, eventName, eventLocation, eventDate, accountID } = req.body;

    const values = [eventID, eventName, eventLocation, eventDate, accountID];
    const newEvent = await pool.query(
      'INSERT INTO events (eventID, eventName, eventLocation, eventDate, accountID) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [eventID, eventName, eventLocation, eventDate, accountID]
    );
    res.json(newEvent.rows);
  } catch (error) {
    console.log(error.message);
  }
})

/* JSON CONFIG INSERTION
{
    "eventID" : "1234",
    "eventName": "nghtmre",
    "eventLocation": "bill graham",
    "eventDate": "2023-09-07",
    "accountID": 1
}
*/

//delete an account

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
