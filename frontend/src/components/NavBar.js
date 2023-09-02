import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navBar'>
      <h1>Item1</h1>
      <div>
        <Link to='#'><h1>Item2</h1></Link>
        <Link to='#'><h1>Item3</h1></Link>
        <Link to='#'><h1>Item4</h1></Link>
      </div>
    </nav>
  )
}

export default NavBar;