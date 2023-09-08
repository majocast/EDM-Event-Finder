import React, {useState, useEffect} from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import Event from '../components/Event';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Account() {
  const location = useLocation();
  const history = useNavigate();
  const [saved, setSaved] = useState([]);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, []);

  const pullInfo = async () => {
    try {
      console.log(localStorage.getItem('email'));
      console.log(email);
      const res = await axios.get(`http://localhost:5000/accountInfo/${email}`);
      setSaved(res.data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }

  useEffect(() => {
    if(email !== null) {
      pullInfo();
    }
  }, [email])

  const signOut = () => {
    localStorage.clear();
    history('/');
  }

  if(!email) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  console.log(saved);
  return (
    <div>
      <div>
        <h2>email: {email}</h2>
        <Link onClick={signOut} to='/'>Log Out</Link>
      </div>
      <div>
        {saved ? 
          <div>
            {saved.map((item, index) => {
              const event = new Event(item.eventname, item.eventdate, item.eventlocation, item.link, item.photo, index);
              return (
                <Col key={index} xs={12} sm={6} md={4}>
                  {event.display()}
                </Col>
              )
            })}
          </div>
        :
          <div>
            <Link to='/events'></Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Account;