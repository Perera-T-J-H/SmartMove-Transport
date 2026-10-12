import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../api/userApi';
import ContactNumbersInput from './ContactNumbersInput';

const UpdateProfile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <Container className="my-5 text-center py-5">
        <h4>Access Denied</h4>
        <p className="text-muted">Please log in to manage your profile attributes.</p>
        <Button onClick={() => navigate('/login')} style={{ backgroundColor: '#c58d5e' }} className="rounded-0 border-0 text-white py-2 px-4">Log In</Button>
      </Container>
    );
  }

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState('');
  const [contactNumbers, setContactNumbers] = useState(
    currentUser.contactNumbers && currentUser.contactNumbers.length ? currentUser.contactNumbers : ['']
  );
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const handleUpdateExecution = async (e) => {
    e.preventDefault();
    setFeedback({ text: '', type: '' });

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setFeedback({ text: 'First name, last name, and email are required.', type: 'danger' });
      return;
    }

    try {
      const updated = await updateUser({
        id: currentUser.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: newPassword.trim() || undefined,
        role: currentUser.role,
        contactNumbers: contactNumbers.map((n) => n.trim()).filter((n) => n !== '')
      });
      const merged = {
        ...currentUser,
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        contactNumbers: updated.contactNumbers || contactNumbers
      };
      localStorage.setItem('currentUser', JSON.stringify(merged));
      setCurrentUser(merged);
      setFeedback({ text: 'Your account details have been successfully modified.', type: 'success' });
    } catch (err) {
      setFeedback({ text: err.message, type: 'danger' });
    }
  };

  const handleAccountDeletion = async () => {
    if (window.confirm('WARNING: Are you absolutely sure you want to permanently delete your account profile? This action cannot be reversed.')) {
      try {
        await deleteUser(currentUser.id);
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        navigate('/');
      } catch (err) {
        setFeedback({ text: err.message, type: 'danger' });
      }
    }
  };

  return (
    <Container className="my-5 py-5" style={{ maxWidth: '600px' }}>
      <Card className="border p-4 rounded-0 bg-white shadow-sm">
        <h2 className="fw-normal text-start mb-4" style={{ color: '#1a2536', fontFamily: 'sans-serif' }}>Update Profile</h2>
        {feedback.text && <Alert variant={feedback.type} className="rounded-0 py-2 small">{feedback.text}</Alert>}

        <Form onSubmit={handleUpdateExecution}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary">First Name</Form.Label>
            <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-0 py-2" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary">Last Name</Form.Label>
            <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-0 py-2" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary">Email Address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-0 py-2" />
          </Form.Group>

          <ContactNumbersInput numbers={contactNumbers} setNumbers={setContactNumbers} />

          <Form.Group className="mb-4">
            <Form.Label className="small fw-semibold text-secondary">New Password (leave blank to keep current)</Form.Label>
            <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="rounded-0 py-2" />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-4">
            <Button variant="danger" className="rounded-0 px-3 py-2 fw-semibold btn-sm" onClick={handleAccountDeletion}>
              Delete Account Profile
            </Button>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="rounded-0 px-4 py-2 btn-sm fw-semibold" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-0 px-4 py-2 btn-sm fw-semibold text-white border-0" style={{ backgroundColor: '#c58d5e' }}>
                Update
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default UpdateProfile;