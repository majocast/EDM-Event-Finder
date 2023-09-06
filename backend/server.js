const express = require('express');
const cors = require('cors');
const app = express();
const { url, Scraper } = require('./scraper.js');
const { accounts } = require('./mongo');

app.use(express.json());
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

app.post('/login', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const { email, password } = req.body;

  try {
    //searches the user in the database
    const check = await accounts.findOne({email: email});
    if(check) {
      //password is correct
      if(check.password === password) {
        res.json({status: "exists", email: check.email});
      }
      //password is incorrect
      else {
        res.json("mismatch");
      }
      
    }
    else {
      res.json("does not exist");
    }
  } catch (error) {
      res.json("does not exist");
  }
})

//registration code
app.post('/register', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
    saved: [],
  }

  try {
    //searches the user in the database
    const check = await accounts.findOne({email: email});
    if(check) {
      res.json("exists");
    }
    else {
      await accounts.insertMany([data]);
      res.json("created");
    }
  } catch (error) {
      res.json("does not exist");
  }
})

app.post('/addsaved', async(req, res) => {
  const {cartValue, cartItem, user, price} = req.body;
  const data = {
    username: user,
    item: cartItem,
    price: price,
    weight: cartValue,
  }
  try {
      await accounts.insertMany([data]);
      res.json('item successfully added to cart!');
  } catch (error) {
      console.log(error)
      res.json("could not complete add item");
  }
})

app.get('/account/:email', async(req, res) => {
  const email = req.params.email;
  console.log(email);
  try {
    //searches the user in the database
    const user = await accounts.findOne({email: email});
    if(user) {
      const userData = {
        email: user.email,
        password: user.password,
        saved: user.saved,
      };
      res.json(userData);
    } else {
      console.log('no user found');
      res.json("user does not exist");
    }
  } catch (error) {
    res.json("does not exist");
  }
})

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
