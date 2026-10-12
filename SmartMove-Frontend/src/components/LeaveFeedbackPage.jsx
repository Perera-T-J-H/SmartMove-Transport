import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getTicketsByPassenger } from '../api/ticketApi';
import { submitFeedback } from '../api/feedbackApi';

const FALLBACK_TICKETS = [
  { tripId: 90, routeLabel: 'Colombo → Galle', tripStatus: 'Completed' },
  { tripId: 91, routeLabel: 'Colombo → Kandy', tripStatus: 'Completed' },
];

const LeaveFeedbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const [tickets, setTickets] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(searchParams.get('tripId') || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }
    getTicketsByPassenger(currentUser.id)
      .then((data) => setTickets(data.filter((t) => t.tripStatus === 'Completed')))
      .catch(() => setTickets(FALLBACK_TICKETS));
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrip) { setError('Please select which trip this feedback is for.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const ticket = tickets.find((t) => String(t.tripId) === String(selectedTrip));
      await submitFeedback({
        passengerId: currentUser.id,
        tripId: Number(selectedTrip),
        routeLabel: ticket?.routeLabel,
        rating: Number(rating),
        comment,
      });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Could not submit feedback — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) return null;

  if (done) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="success">
          <h4 className="fw-bold">Thanks for your feedback!</h4>
          <p className="mb-0">It helps us improve the service.</p>
        </Alert>
        <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => navigate('/my-tickets')}>
          Back to My Tickets
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="fw-bold mb-1">Leave Feedback</h2>
      <p className="text-muted mb-4">Tell us how a completed trip went.</p>

      {tickets.length === 0 ? (
        <Alert variant="info">You don't have any completed trips to review yet.</Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Which trip?</Form.Label>
            <Form.Select value={selectedTrip} onChange={(e) => setSelectedTrip(e.target.value)}>
              <option value="">-- Select a completed trip --</option>
              {tickets.map((t) => (
                <option key={t.tripId} value={t.tripId}>{t.routeLabel}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Rating</Form.Label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Button
                  key={n}
                  type="button"
                  variant={rating >= n ? 'warning' : 'outline-secondary'}
                  onClick={() => setRating(n)}
                >
                  ★
                </Button>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="How was the driver, the vehicle, punctuality..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button type="submit" size="lg" style={{ backgroundColor: '#2563eb', border: 'none' }} disabled={submitting}>
            {submitting ? <Spinner size="sm" animation="border" /> : 'Submit Feedback'}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default LeaveFeedbackPage;
