import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const [email, setEmail] = useState(false);

  useEffect(() => {
    console.log(email);
    if(localStorage.getItem('email')) {
      setEmail(true);
    } else {
      setEmail(false);
    }
  }, [location.pathname]);

  return (
    <nav className='navBar'>
      <Link to='/'><h1>Event Finder</h1></Link>
      <div>
        <Link to='/events'><h1>Events</h1></Link>
        <Link to={email ? '/account' : '/login'}><h1>Profile</h1></Link>
      </div>
    </nav>
  )
}

export default NavBar;