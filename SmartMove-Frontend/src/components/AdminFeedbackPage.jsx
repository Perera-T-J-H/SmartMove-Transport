import React, { useEffect, useState } from 'react';
import { Container, Card, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllFeedback, searchFeedback } from '../api/feedbackApi';

const FALLBACK = [
  { feedbackId: 1, passengerName: 'John Doe', routeLabel: 'Colombo-Kandy', rating: 4, comment: 'Great trip, the AC was perfectly regulated. Driver was very professional.', submitDate: '2026-09-20' },
  { feedbackId: 2, passengerName: 'Sarah Jenkins', routeLabel: 'Colombo-Galle', rating: 3, comment: 'Comfortable seats, but departure was delayed by 15 minutes.', submitDate: '2026-09-14' },
];

const AdminFeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    getAllFeedback()
      .then((data) => { setFeedback(data); setUsingFallback(false); })
      .catch(() => { setFeedback(FALLBACK); setUsingFallback(true); });
  };
  useEffect(load, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) { load(); return; }
    setError('');
    try {
      const results = await searchFeedback(keyword.trim());
      setFeedback(results);
      setUsingFallback(false);
    } catch {
      // Local fallback search over sample data, so the keyword-search UI is still demoable offline.
      setFeedback(FALLBACK.filter((f) => f.comment.toLowerCase().includes(keyword.toLowerCase())));
      setUsingFallback(true);
    }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <h2 className="fw-bold mb-1">Feedback</h2>
        <p className="text-muted small mb-4">Passenger reviews and complaints, stored in MongoDB.</p>

        <Form onSubmit={handleSearch} className="mb-3" style={{ maxWidth: '420px' }}>
          <InputGroup>
            <Form.Control
              placeholder="Search comments (e.g. 'delayed', 'rude', 'AC')"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="submit" style={{ backgroundColor: '#2563eb', border: 'none' }}>Search</Button>
          </InputGroup>
        </Form>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/feedback</code> and <code>GET /api/feedback/search</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {feedback.length === 0 ? (
          <p className="text-muted">No feedback matches that search.</p>
        ) : (
          feedback.map((f) => (
            <Card key={f.feedbackId} className="mb-2 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">{f.passengerName} <span className="text-muted fw-normal">on {f.routeLabel}</span></span>
                  <span className="text-warning">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
                </div>
                <p className="mb-1">{f.comment}</p>
                <span className="text-muted small">{f.submitDate}</span>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
};

export default AdminFeedbackPage;
