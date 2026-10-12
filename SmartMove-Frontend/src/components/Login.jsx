import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLog, setErrorLog] = useState('');

  const handleSignInClick = async (e) => {
    e.preventDefault();
    setErrorLog('');

    if (!email.trim() || !password.trim()) {
      setErrorLog('Please fill in both email and password.');
      return;
    }

    try {
      const user = await loginUser(email.trim(), password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'DRIVER') {
        navigate('/driver/trips');
      } else if (user.role === 'MECHANIC') {
        navigate('/mechanic/jobs');
      } else {
        navigate('/');
      }

    } catch (err) {
      setErrorLog(err.message);
    }
  };

  return (
    <Container className="my-5 py-5" style={{ maxWidth: '650px' }}>
      <h1 className="fw-normal mb-2 text-start" style={{ color: '#1a2536', fontSize: '36px' }}>Login</h1>
      <p className="text-secondary mb-4 text-start" style={{ fontSize: '15px' }}>
        If you have an account, please log in.
      </p>

      {errorLog && <Alert variant="danger" className="rounded-0 py-2 small">{errorLog}</Alert>}

      <Form onSubmit={handleSignInClick}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="text-end mb-4">
          <Link to="/forgot-password" style={{ color: '#1a2536', textDecoration: 'none', fontSize: '15px' }}>
            Forgot your password?
          </Link>
        </div>

        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="rounded-0 px-5 py-2 fw-semibold text-white border-0"
            style={{ backgroundColor: '#c58d5e', minWidth: '140px' }}
          >
            Sign in
          </Button>
        </div>
      </Form>
      <p className="text-center mt-3 mb-0 small">
        Don't have an account? <Link to="/register" className="fw-semibold">Sign up</Link>
      </p>
    </Container>
  );
};

export default Login;