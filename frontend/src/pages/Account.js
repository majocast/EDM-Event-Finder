import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Account() {
  const location = useLocation();
  const history = useNavigate();
  const [saved, setSaved] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, []);

  const pullInfo = async () => {
    try {
      console.log(localStorage.getItem('email'));
      console.log(`http://localhost:5000/account/${email}`);
      const response = await axios.get(`http://localhost:5000/account/${email}`);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setSaved(response.data.saved);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }

  useEffect(() => {
    if(email !== undefined) {
      pullInfo();
    }
  }, [email])

  const signOut = () => {
    localStorage.clear();
    history('/');
  }

  if(!password || !email) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  
  return (
    <div>
      <div>
        <h2>email: {email}</h2>
        <Link onClick={signOut} to='/'>Log Out</Link>
      </div>
    </div>
  )
}

export default Account;