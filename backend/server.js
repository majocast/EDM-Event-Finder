const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { Scraper } = require('./scraper.js');
const crypto = require('crypto');
require('dotenv').config();

//encryption algorithm
const algorithm = 'aes-256-cbc';

//private key
const key = `${process.env.ENCRYPTKEY}`;

//initialization vector
const initVector = crypto.randomBytes(16);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: `${process.env.EEF_HOME}`}));
//app.use(cors({origin: `http://localhost:3000`}));

app.post('/load', async (req, res) => {
  try {
    var events;
    if(req.body.pageNum) {
      const { pageNum } = req.body;
      events = await Scraper(pageNum);
    } else {
      events = await Scraper();
    }
    res.json(events);
  } catch (err) {
    console.log(err.message);
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
      const cipher = crypto.createCipheriv(algorithm, key, initVector);
      let encryptedData = cipher.update(password, 'utf-8', 'hex');
      encryptedData += cipher.final('hex');
      const base64data = Buffer.from(initVector, 'binary').toString('base64');
      let encryptedPass = encryptedData;
      const userInitVector = base64data;
      const newAccount = await pool.query(
        "INSERT INTO accounts (email, pass, initVector) VALUES($1, $2, $3) RETURNING *",
        [email, encryptedPass, userInitVector]
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
    const account = await pool.query(
      'SELECT * FROM accounts WHERE email = $1', 
      [email]
    );
    if(account.rows.length === 0) {
      res.json('not exist');
    } else {
      const encryptedData = Buffer.from(account.rows[0].initvector, 'base64');
      const decipher = crypto.createDecipheriv(algorithm, key, encryptedData);
      let decryptedData = decipher.update(account.rows[0].pass, 'hex', 'utf-8');
      decryptedData += decipher.final('utf-8');
      if(decryptedData === password) {
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

//get and clean account's info such as events
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
    allEvents.rows.forEach(async (event) => {
      let eventDate = new Date(event.eventdate);
      let currDate = new Date();
      if(eventDate < currDate) {
        console.log('event has passed: ' + event.eventname);
        const deleteEvent = await pool.query(
          'DELETE FROM events WHERE eventname = $1 AND eventdate = $2 AND accountid = $3',
          [event.eventname, event.eventdate, accountID]
        )
      } else {
        console.log('event is coming up');
      }
    })
    res.json(allEvents.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//call to get account Info function 
/*
http://localhost:5000/accountInfo/test@mail.com
*/

//DELETE AN ACCOUNT
app.delete('/account/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await pool.query(
      'DELETE FROM accounts WHERE email = $1',
      [email]
    )
    .then(()=> {
      res.json('delete account success');
    })
    .catch(err => {
      console.log(err.message);
    })
  } catch (err) {
    console.log(err.message);
  }
});

/* JSON CONFIG INSERTION
{
    "email": "test@mail.com"
*/

/**
 * EVENT ROUTES
 */

//add an event
//fix add event to make sure that it adds the picture of the event and the link,
//bind command to bookmark icon button press.
app.post('/event/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, location, date, link, photo } = req.body;
    console.log(req.body);
    
    let accountID = await pool.query(
      'SELECT * FROM accounts WHERE email = $1',
      [email]
    );
    accountID = accountID ? accountID.rows[0].accountid : null;

    const newEvent = await pool.query(
      'INSERT INTO events (eventName, eventLocation, eventDate, eventLink, eventPhoto, accountID) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, location, date, link, photo, accountID]
    );
    res.status(200).send('Success');
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
app.delete('/event/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, location, date, link, photo } = req.body;
    let accountID = await pool.query(
      'SELECT * FROM accounts WHERE email = $1',
      [email]
    );
    accountID = accountID ? accountID.rows[0].accountid : null;

    const deleteEvent = await pool.query(
      'DELETE FROM events WHERE eventname = $1 AND eventlocation = $2 AND eventdate = $3 AND eventlink = $4 AND eventphoto = $5 AND accountid = $6',
      [name, location, date, link, photo, accountID]
    );
    res.status(200).send('Success');
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
