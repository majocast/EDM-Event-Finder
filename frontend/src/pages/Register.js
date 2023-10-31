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
  const [confirmPassword, setConfirmPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    
    //base case for checking if passwords match
    if(password !== confirmPassword) {
      alert('ERROR: Passwords Do Not Match');
      return;
    }

    //input new email into DB and rerouting to account page
    try {
      await axios.post(`${process.env.REACT_APP_EEF_SERVER}/account`, {
        email, password,
      })
      .then((res) => {
        if(res.data === 'exists') {
          alert('username or email has already registered');
          history('/login');
        }
        else {
          localStorage.setItem('email', email);
          history('/account');
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }}/>
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
