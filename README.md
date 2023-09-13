
# Project Title

A fully responsive, full-stack event scraper application that allows users view the next EDM events in California. Furthermore, users can create an account and save the upcoming events that they wish to attend, providing a more personalized experience when finding and tracking your anticipated events.

## Demo

https://edmeventfinder.onrender.com/events


## Technologies

ReactJS \
HTML \
Puppeteer\
Express\
SCSS\
Bootstrap\
Node.js\
Express\
Axios\
SQL\
PostgreSQL
## File Documentation

### Server Side

#### database.sql
SQL code file that handles the create functions for the PostgreSQL database. Creates initial database "edmeventfinder" and the tables named "accounts" and "events", where events inherits foreign key "accountID" from accounts to bind saved events to accounts.

#### db.js
JS file that handles the connection to the database for the application and the authorization for such, passing in appropriate variables to do so from .env

#### puppeteer.config.cjs
Basic puppeteer config file that handles the cache routing for puppeteer.

#### Scraper.js
Invoked by Server.js, handles the connection to the target website and the parsing of the appropriate elements that will be displayed on the frontend. 

#### Server.js
Main server file that handles all the commands passed from the frontend to the server, commands include the follow: \
Create an account \
Login\
loading assets/invoking scraper \
pulling account information \
adding a saved event \
removing a saved event

### Client Side

#### App.js 
Stores and renders routes for pages and calls "load" command to pull assets from target website.

#### Account.js
Account page that is rendered when user is logged in, pulls account information from the server and displays email and saved events, as well as a logout button.

#### Events.js
Displays all the events that result from the scrape. Accompanied by a dynamic filter that parses all elements of each event to find items/elements that match the text inputted into the filter.

#### Home.js
Landing page for the application. Renders a landing photo and the next 4 events happening soon.

#### Login.js
Login page that is rendered first if the user is not logged in on the browser. Sends a get request if the user attempts to log in and will send the appropriate response depending on if the credentials exist within the database. If login is correct, it will rerender the page to Account.js with the appropriate information.

#### Register.js
Similar file to Login.js, but sends a post request with the credentials inputted to the server to save the login information to the server. Will return the user to login.js to log in to their newly created account.

#### Event.js
Event component file that handles the creation of an individual event element for Events.js. Implements Bootstrap Card to create the render, as well as contains a button that allows users to save the event if they are logged into an account.

#### Filter.js
Filter.js is a component file that takes the input from the filter section and searches for event elements that contain that string, then returns the data to Events.js to be displayed.

#### NavBar.js
NavBar component file that is rendered on every page and sends the redirects for the application to load the appropriate page. 

#### App.scss
Main SCSS file that handles all the styling for the application outside of Bootstrap and in-line styling.

#### Index.js
Handles the application rendering overall to the DOM.


