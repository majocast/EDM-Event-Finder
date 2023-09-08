import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      //we are posting the data to the server + '/register'
      await axios.post(`http://localhost:5000/account`, {
        email, password,
      })
      .then((res) => {
        if(res.data === 'exists') {
          alert('username or email has already registered');
          history('/login');
        }
        else {
          alert('successfully registered, redirecting to home');
          history('/');
        }
      })
      .catch((error) => {
        alert('wrong details');
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <h1>Register</h1>
        <Form action='POST'>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
        <p>OR</p>
        <Link to='/account'>Login</Link>
      </div>
    </div>
  );
}

export default Register;