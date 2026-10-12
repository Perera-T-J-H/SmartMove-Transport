import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPayment } from '../api/paymentApi';

// Payment methods allowed by the payment table: pay_type IN ('Cash','Card')
const PAY_TYPES = ['Card', 'Cash'];

// Opened after a ticket is booked (or from "Pay now" on My Tickets).
// The ticket details arrive through the router state: { ticketId, amount, routeLabel, seatNum }
const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [payType, setPayType] = useState('Card');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [paid, setPaid] = useState(false);

  if (!state || !state.ticketId) {
    return (
      <Container className="py-5 text-center">
        <p className="text-muted">No ticket selected for payment.</p>
        <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => navigate('/my-tickets')}>
          Go to My Tickets
        </Button>
      </Container>
    );
  }

  const handlePay = async () => {
    setPaying(true);
    setError('');
    try {
      // payment row: amount, pay_type and the ticket it belongs to (pay_date and status are set by the database)
      await createPayment({ ticketId: state.ticketId, amount: state.amount, payType });
      setPaid(true);
    } catch (e) {
      setError(e.message || 'Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  if (paid) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: '520px' }}>
        <Alert variant="success">
          <h4 className="fw-bold">Payment Successful</h4>
          <p className="mb-0">Rs. {Number(state.amount).toFixed(2)} paid by {payType}.</p>
        </Alert>
        <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => navigate('/my-tickets')}>
          View My Tickets
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: '520px' }}>
      <h2 className="fw-bold mb-4">Payment</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-1"><span className="text-muted">Ticket</span><span className="fw-semibold">{state.ticketId}</span></div>
          {state.routeLabel && <div className="d-flex justify-content-between mb-1"><span className="text-muted">Route</span><span>{state.routeLabel}</span></div>}
          {state.seatNum && <div className="d-flex justify-content-between mb-1"><span className="text-muted">Seat</span><span>{state.seatNum}</span></div>}
          <hr />
          <div className="d-flex justify-content-between"><span className="fw-semibold">Amount to pay</span><span className="fw-bold text-primary">Rs. {Number(state.amount).toFixed(2)}</span></div>
        </Card.Body>
      </Card>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Payment method</Form.Label>
        {PAY_TYPES.map((t) => (
          <Form.Check
            key={t}
            type="radio"
            id={`pay-${t}`}
            name="payType"
            label={t}
            checked={payType === t}
            onChange={() => setPayType(t)}
          />
        ))}
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button size="lg" className="w-100" style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={handlePay} disabled={paying}>
        {paying ? <Spinner size="sm" animation="border" /> : `Pay Rs. ${Number(state.amount).toFixed(2)}`}
      </Button>
      <Button variant="link" className="w-100 mt-2" onClick={() => navigate('/my-tickets')}>Pay later</Button>
    </Container>
  );
};

export default PaymentPage;
