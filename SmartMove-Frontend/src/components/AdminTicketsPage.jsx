import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllTickets } from '../api/ticketApi';

const FALLBACK = [
  { ticketId: 1, passengerName: 'John Doe', routeLabel: 'Colombo → Kandy', depaDatetime: '2026-09-27T08:00:00', seatNum: '3B', price: 450, tripStatus: 'Scheduled', paymentStatus: 'Paid' },
  { ticketId: 2, passengerName: 'Sarah Jenkins', routeLabel: 'Colombo → Galle', depaDatetime: '2026-09-15T09:30:00', seatNum: '1A', price: 600, tripStatus: 'Completed', paymentStatus: 'Paid' },
];

// A ticket has no status of its own: its trip status and its payment decide what to show.
const tripVariant = (s) => ({ Scheduled: 'primary', Completed: 'dark', Cancelled: 'danger' }[s] || 'secondary');

const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    getAllTickets()
      .then((data) => { setTickets(data); setUsingFallback(false); })
      .catch(() => { setTickets(FALLBACK); setUsingFallback(true); });
  }, []);

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <h2 className="fw-bold mb-1">Tickets</h2>
        <p className="text-muted small mb-4">All ticket bookings across every route and trip.</p>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/tickets</code>.</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Ticket ID</th><th>Passenger</th><th>Route</th><th>Departure</th><th>Seat</th><th>Price</th><th>Trip</th><th>Payment</th></tr></thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticketId}>
                <td className="fw-semibold text-primary">{t.ticketId}</td>
                <td>{t.passengerName}</td>
                <td>{t.routeLabel}</td>
                <td>{new Date(t.depaDatetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{t.seatNum}</td>
                <td>Rs. {t.price}</td>
                <td><Badge bg={tripVariant(t.tripStatus)}>{t.tripStatus}</Badge></td>
                <td><Badge bg={t.paymentStatus === 'Paid' ? 'success' : t.paymentStatus === 'Refunded' ? 'secondary' : 'warning'}>{t.paymentStatus || 'Unpaid'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminTicketsPage;
