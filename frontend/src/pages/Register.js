import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
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
      //${process.env.REACT_APP_EEF_SERVER}
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
          alert('successfully registered, please log in');
          history('/login');
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
    <Container className='loginRegistration'>
      <h1>Register</h1>
      <Form action='POST'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submit}>
          Register
        </Button>
      </Form>
      <p className='py-2 font-bold'>OR</p>
      <Link to='/login'>Login</Link>
    </Container>
  );
}

export default Register;