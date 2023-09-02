const express = require('express');
const cors = require('cors');
const app = express();
const { url, Scraper } = require('./scraper.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/load', async (req, res) => {
  try {
    const events = await Scraper();
    console.log(`scraper completed: ${events[0].title}`);
    res.json(events);
  } catch (error) {
    console.log(error);
  }
})


let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`); 
})
