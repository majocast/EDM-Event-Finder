const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const Scraper = async (pageNum) => {
  let url = `https://concerts50.com/upcoming-concerts-in-california/g/dance-electronic`;
  try {
    url = pageNum !== undefined ? `${url}/${pageNum}` : url;
    const axiosRes = await axios(url);
    const htmlData = axiosRes.data;
    const $ = cheerio.load(htmlData);
    const events = [];
    $('.c50-table-row', htmlData).each((index, element) => {
      const title = $(element).children('.c50-table-info').children('.c50-title').text().trim();
      const location = $(element).children('.c50-table-info').children('.c50-description').text().trim();
      const date = $(element).children('.c50-table-date').children('.c50-block-date').text().replace(/\n/g, '').trim();
      const photo = $(element).children('.c50-table-date').children('.c50-block-photo').children('a').children('img').attr('src');
      const link = $(element).children('.c50-table-button').children('.tickets').children('button').attr('x-url');
      events.push({
        title,
        location,
        date,
        photo,
        link
      })
    })
    
    //pushes data back to server
    return events;
  } catch (error) {
    console.log(error);    
  }
};

module.exports = { Scraper };
