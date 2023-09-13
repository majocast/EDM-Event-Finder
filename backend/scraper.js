const puppeteer = require('puppeteer');
require('dotenv').config();

const baseUrl = `https://concerts50.com/upcoming-concerts-in-california/g/dance-electronic`;

const Scraper = async () => {
  try {
    //browser launches for puppeteer under parameters specified
    const browser = await puppeteer.launch({ 
      args: [
        "--no-sandbox",
        "--no-zygote",
        "--single-process",
        "--disable-setuid-sandbox",
      ],
      headless: 'true',
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    });
    const page = await browser.newPage();
    await page.goto(baseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    /**Optimized code */
    //looks into DOM content of the page and finds specified properties of '.c50-table-row' and pulls information from them for storage
    const pulledEvents = await page.$$eval('.c50-table-row', (events) => {
      return events.map((event) => {
        const title = event.querySelector('.c50-title a').textContent;
        const location = event.querySelector('.c50-description').textContent.replace(/\n/g, '').trim();
        const date = event.querySelector('.c50-block-date').textContent.replace(/\n/g, '').trim();
        const photo = event.querySelector('.c50-block-photo a img').src;
        const link = event.querySelector('.c50-table-button div button').getAttribute('x-url');
        return { title, location, date, photo, link };
      });
    });

    await browser.close();
    //pushes data back to server
    return pulledEvents;
  } catch (error) {
    console.log(error);    
  }
};

module.exports = { Scraper };
