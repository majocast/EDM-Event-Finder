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
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})


let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
