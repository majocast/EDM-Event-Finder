import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navBar'>
      <Link to='/'><h1>Event Scraper</h1></Link>
      <div>
        <Link to='/'><h1>Item2</h1></Link>
        <Link to='#'><h1>Item3</h1></Link>
        <Link to='/account'><h1>Account</h1></Link>
      </div>
    </nav>
  )
}

export default NavBar;