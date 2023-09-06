import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    console.log(email, password);
    e.preventDefault();
    try {
      //we are posting the data to the server + '/login'
      await axios.post(`http://localhost:5000/login`, {
        email, password
      })
      .then((res) => {
        if(res.data.status === 'exists') {
          const returnedUser = res.data.email;
          localStorage.setItem('email', returnedUser);
          history('/');
        }
        else if(res.data === 'mismatch') {
          alert('email or password is incorrect');
          history('/login');
        }
        else if(res.data === 'does not exist') {
          alert('user has not registered');
          history('/register');
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
    <Container className='account'>
      <h1>Account</h1>
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
          Submit
        </Button>
      </Form>
      <p className='py-2 font-bold'>OR</p>
      <Link to='/register'>Register</Link>
    </Container>
  )
}

export default Account;