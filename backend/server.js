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

/* JSON CONFIG INSERTION
{
    "email": "test@example.com",
    "pass": "example_pass"
}
*/

//get an account
app.get('/account/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const account = await pool.query(
      'SELECT * FROM accounts WHERE email = $1', 
      [email]
    );
    res.json(account);
  } catch (err) {
    console.log(err.message);
  }
})

//call to get account function 
/*
http://localhost:5000/account/test@mail.com
*/


//get all user saved events
app.get('/userEvents/:email', async (req, res) => {
  try {
    const { email } = req.params;
    let accountID = await pool.query(
      'SELECT * FROM accounts WHERE email = $1', 
      [email]
    );
    accountID = accountID ? accountID.rows[0].accountid : null;
    const allEvents = await pool.query(
      'SELECT * FROM events WHERE accountID = $1', 
      [accountID]
    );
    res.json(allEvents.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//call to get user events function 
/*
http://localhost:5000/userEvents/test@mail.com
*/

//add an event
app.post('/event', async (req, res) => {
  try {
    const { eventID, eventName, eventLocation, eventDate, accountID } = req.body;
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

//delete an event
app.delete('/event', async (req, res) => {
  try {
    const { eventID } = req.body;
    const deleteEvent = await pool.query(
      'DELETE FROM events WHERE eventID = $1',
      [eventID]
    );
    res.json('delete event success');
  } catch (err) {
    console.log(err.message);
  }
});

//delete an account



let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
