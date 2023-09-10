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

//create an unique account
app.post('/account', async (req, res) => {
  //AWAIT
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //ensuring that email is unique to others
    const exists = await pool.query(
      "SELECT * FROM accounts WHERE email = $1",
      [email]
    );
    if(exists.rows.length !== 0) {
      res.json('exists');
    } else {
      const newAccount = await pool.query(
        "INSERT INTO accounts (email, pass) VALUES($1, $2) RETURNING *",
        [email, password]
      );
      res.json(newAccount.rows[0]);
    }
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

//login an account
app.get('/account/:email/:password', async (req, res) => {
  try {
    const { email, password } = req.params;
    console.log(email, password);
    const account = await pool.query(
      'SELECT * FROM accounts WHERE email = $1', 
      [email]
    );
    if(account.rows.length === 0) {
      res.json('not exist');
    } else {
      if(account.rows[0].pass === password) {
        res.json(account.rows);
      } else {
        res.json('invalid');
      }
    }
  } catch (err) {
    console.log(err.message);
  }
})

//call to get account function 
/*
http://localhost:5000/account/test@mail.com/1234
*/

//delete an account
app.delete('/account', async (req, res) => {
  try {
    const { email } = req.body;
    const deleteAccount = await pool.query(
      'DELETE FROM accounts WHERE email = $1',
      [email]
    );
    res.json('delete event success');
  } catch (err) {
    console.log(err.message);
  }
});

/* JSON CONFIG INSERTION
{
    "email": "test@mail.com"
}
*/

//get an account's info such as events
app.get('/accountInfo/:email', async (req, res) => {
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
    console.log(allEvents.rows);
    res.json(allEvents.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//call to get account Info function 
/*
http://localhost:5000/accountInfo/test@mail.com
*/

//add an event
//fix add event to make sure that it adds the picture of the event and the link,
//bind command to bookmark icon button press.
app.post('/event/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, location, date, link, photo} = req.body;
    console.log(email);
    console.log(name, location, date, link, photo);
    
    let accountID = await pool.query(
      'SELECT * FROM accounts WHERE email = $1',
      [email]
    );
    accountID = accountID ? accountID.rows[0].accountid : null;

    const newEvent = await pool.query(
      'INSERT INTO events (eventName, eventLocation, eventDate, eventLink, eventPhoto, accountID) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, location, date, link, photo, accountID]
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
/* JSON CONFIG DELETE CALL
{
  "eventID": 1
}
*/

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
