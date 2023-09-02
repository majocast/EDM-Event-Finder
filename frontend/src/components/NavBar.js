import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navBar'>
      <h1>Item1</h1>
      <div>
        <Link to='#'>Item2</Link>
        <Link to='#'>Item3</Link>
        <Link to='#'>Item4</Link>
      </div>
    </nav>
  )
}

export default NavBar;