import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    console.log(email, password);
    e.preventDefault();
    try {
      //we are posting the data to the server + '/login'
      //${process.env.REACT_APP_EEF_SERVER}
      await axios.get(`${process.env.REACT_APP_EEF_SERVER}/account/${email}/${password}`)
      .then((res) => {
        console.log(res.data);
        if(res.data === 'invalid') {
          alert('invalid email or password');
        } else if(res.data === 'not exist') {
          alert('login does not exist, redirecting to register');
          history('/register');
        } else {
          console.log(res.data);
          localStorage.setItem('email', res.data[0].email);
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
      <h1>Login</h1>
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
          Log In
        </Button>
      </Form>
      <p className='py-2 font-bold'>OR</p>
      <Link to='/register'>Register</Link>
    </Container>
  )
}

export default Login;