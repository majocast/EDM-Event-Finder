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
    const { email } = req.body;
    const newAccount = await pool.query(
      "INSERT INTO accounts (email) VALUES($1) RETURNING *",
      [email]
    );
    res.json(newAccount.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//get all saved events if they exist
app.get('/userEvents', async (req, res) => {
  try {
    const allEvents = await pool.query('SELECT * FROM events');
    res.json(allEvents.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//add an event
app.post('/addEvent', async (req, res) => {
  try {
    const { eventName, eventLocation, eventDate, accountID } = req.body;

    const values = [eventName, eventLocation, eventDate, accountID];
    const newEvent = await pool.query('INSERT INTO events (eventName, eventLocation, eventDate VALUES', values);
    res.json(newEvent.rows);
  } catch (error) {
    
  }
})

//delete an account

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
