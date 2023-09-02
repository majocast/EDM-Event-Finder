const puppeteer = require('puppeteer');

const url = "https://concerts50.com/upcoming-concerts-in-california/g/dance-electronic?city=san-francisco&is_hot=0&dateto=";

const Scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const numberOfPages = await page.evaluate(() => {
    const pageNumbers = document.querySelectorAll('.c50-page-link').innerHTML;
    return pageNumbers;
  });
  console.log(numberOfPages);
  const allEvents = await page.evaluate(() => {
    const events = document.querySelectorAll('.c50-table-row');
    return Array.from(events).map((event) => {
      const title = event.querySelector('.c50-title a').innerHTML;
      const location = event.querySelector('.c50-description').innerHTML;
      return { title, location };
    });
  })
  await browser.close();
  return allEvents;
};

module.exports = { url, Scraper };
