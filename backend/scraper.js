const puppeteer = require('puppeteer');
require('dotenv').config();

const Scraper = async (data, pageNum) => {
  let url = `https://concerts50.com/upcoming-concerts-in-california/g/dance-electronic`;
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
      /*executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,*/
    });
    const page = await browser.newPage();
    console.log(`In Scraper: ${pageNum}`);
    url = pageNum !== undefined ? `${url}/${pageNum}` : url;
    console.log(url);

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    /**Optimized code */
    //looks into DOM content of the page and finds specified properties of '.c50-table-row' and pulls information from them for storage
    var pulledEvents = await page.$$eval('.c50-table-row', (events) => {
      return events.map((event) => {
        const title = event.querySelector('.c50-title a').textContent;
        const location = event.querySelector('.c50-description').textContent.replace(/\n/g, '').trim();
        const date = event.querySelector('.c50-block-date').textContent.replace(/\n/g, '').trim();
        const photo = event.querySelector('.c50-block-photo a img').src;
        const link = event.querySelector('.c50-table-button div button').getAttribute('x-url');
        return { title, location, date, photo, link };
      });
    });


    //needs optimization rework for loading on request
    /*
    const numberOfPages = await page.evaluate(() => {
      const pageNumbers = document.querySelectorAll('.c50-page-item');
      const numOfPages = Array.from(pageNumbers).map(page => {
        const number = page.getAttribute('page');
        return number; 
      }).sort((a, b) => a - b);
      return numOfPages[numOfPages.length - 1];
    });
    const pulledEvents = [];
    const eventsOnPage = await page.evaluate(() => {
      const events = document.querySelectorAll('.c50-table-row');
      return Array.from(events).map((event) => {
        const title = event.querySelector('.c50-title a').textContent;
        const location = event.querySelector('.c50-description').textContent.replace(/\n/g, '').trim();
        const date = event.querySelector('.c50-block-date').textContent.replace(/\n/g, '').trim();
        const photo = event.querySelector('.c50-block-photo a img').src;
        const link = event.querySelector('.c50-table-button div button').getAttribute('x-url');
        return { title, location, date, photo, link };
      });
    })
    pulledEvents.push(...eventsOnPage);
    */


    /*formerly:  for(let i = 1; i <= numberOfPages; i++) {


    for(let i = 1; i <= 1; i++) {
      const pageUrl = i === 1 ? baseUrl : `${baseUrl}/${i}`;
      const urlPage = await browser.newPage();
      await urlPage.goto(pageUrl, {
        waitUntil: 'load',
        timeout: 0,
      });
      /*formerly:  const eventsOnPage = await urlPage.evaluate(() => {
      const eventsOnPage = await urlPage.evaluate(() => {
        const events = document.querySelectorAll('.c50-table-row');
        return Array.from(events).map((event) => {
          const title = event.querySelector('.c50-title a').textContent;
          const location = event.querySelector('.c50-description').textContent.replace(/\n/g, '').trim();
          const date = event.querySelector('.c50-block-date').textContent.replace(/\n/g, '').trim();
          const photo = event.querySelector('.c50-block-photo a img').src;
          const link = event.querySelector('.c50-table-button div button').getAttribute('x-url');
          return { title, location, date, photo, link };
        });
      })
      pulledEvents.push(...eventsOnPage);
    }
    */
    if(data) {
      console.log(data[data.length - 1]);
      pulledEvents = [...data, ...pulledEvents];
    }
    await browser.close();
    //pushes data back to server
    return pulledEvents;
  } catch (error) {
    console.log(error);    
  }
};

module.exports = { Scraper };
