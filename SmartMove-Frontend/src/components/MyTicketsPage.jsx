import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTicketsByPassenger } from '../api/ticketApi';

const FALLBACK_TICKETS = [
  { ticketId: 1, tripId: 101, routeLabel: 'Colombo → Kandy', depaDatetime: '2026-09-27T08:00:00', seatNum: '3B', price: 450, tripStatus: 'Scheduled', paymentStatus: null },
  { ticketId: 2, tripId: 90, routeLabel: 'Colombo → Galle', depaDatetime: '2026-09-15T09:30:00', seatNum: '1A', price: 600, tripStatus: 'Completed', paymentStatus: 'Paid' },
];

// A ticket has no status column: the status shown is the status of its trip.
const statusVariant = (status) => {
  if (status === 'Scheduled') return 'primary';
  if (status === 'Completed') return 'dark';
  if (status === 'Cancelled') return 'danger';
  return 'secondary';
};

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    getTicketsByPassenger(currentUser.id)
      .then(setTickets)
      .catch(() => {
        setTickets(FALLBACK_TICKETS);
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) return null;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">My Tickets</h2>

      {usingFallback && (
        <Alert variant="warning" className="small">
          Showing sample tickets — connect <code>GET /api/tickets?passengerId=</code> to see your real bookings.
        </Alert>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : tickets.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">You haven't booked any trips yet.</p>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => navigate('/book')}>
            Book a Trip
          </Button>
        </div>
      ) : (
        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>Ticket ID</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Seat</th>
              <th>Price</th>
              <th>Trip</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticketId}>
                <td className="fw-semibold text-primary">{t.ticketId}</td>
                <td>{t.routeLabel}</td>
                <td>{new Date(t.depaDatetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{t.seatNum}</td>
                <td>Rs. {t.price}</td>
                <td><Badge bg={statusVariant(t.tripStatus)}>{t.tripStatus}</Badge></td>
                <td>
                  <Badge bg={t.paymentStatus === 'Paid' ? 'success' : t.paymentStatus === 'Refunded' ? 'secondary' : 'warning'}>
                    {t.paymentStatus || 'Unpaid'}
                  </Badge>
                </td>
                <td>
                  {t.tripStatus === 'Scheduled' && t.paymentStatus !== 'Paid' && (
                    <Button
                      size="sm"
                      className="me-2"
                      style={{ backgroundColor: '#2563eb', border: 'none' }}
                      onClick={() => navigate('/payment', { state: {
                        ticketId: t.ticketId,
                        amount: t.price,
                        routeLabel: t.routeLabel,
                        seatNum: t.seatNum,
                      } })}
                    >
                      Pay now
                    </Button>
                  )}
                  {t.tripStatus === 'Completed' && (
                    <Button size="sm" variant="outline-primary" onClick={() => navigate(`/feedback?tripId=${t.tripId}`)}>
                      Leave Feedback
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyTicketsPage;
