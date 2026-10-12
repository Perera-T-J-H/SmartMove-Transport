import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';
import ContactNumbersInput from './ContactNumbersInput';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumbers, setContactNumbers] = useState(['']);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('All registration entry fields are required.');
      return;
    }

    // Keep only the numbers that were actually typed in
    const cleanedNumbers = contactNumbers.map((n) => n.trim()).filter((n) => n !== '');
    if (cleanedNumbers.length === 0) {
      setErrorMsg('Please enter at least one contact number.');
      return;
    }

    try {
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password,
        contactNumbers: cleanedNumbers
      });
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Container className="my-5 py-5" style={{ maxWidth: '650px' }}>
      <h1 className="fw-normal mb-4 text-center" style={{ color: '#1a2536', fontSize: '42px' }}>
        Create account
      </h1>

      {errorMsg && <Alert variant="danger" className="rounded-0 py-2 small">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success" className="rounded-0 py-2 small">🎉 {successMsg}</Alert>}

      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="First name"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Last name"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

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

        <ContactNumbersInput numbers={contactNumbers} setNumbers={setContactNumbers} />

        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            placeholder="Password"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="text-start">
          <Button
            type="submit"
            className="rounded-0 px-4 py-2 fw-semibold text-white border-0"
            style={{ backgroundColor: '#c58d5e', minWidth: '120px' }}
          >
            Create
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;