import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllPayments } from '../api/paymentApi';

const FALLBACK = [
  { paymentId: 'PMT-501', ticketId: 1, passengerName: 'John Doe', amount: 450, payType: 'Card', payDate: '2026-09-26T10:15:00', status: 'Paid' },
  { paymentId: 'PMT-499', ticketId: 2, passengerName: 'Sarah Jenkins', amount: 600, payType: 'Cash', payDate: '2026-09-14T16:40:00', status: 'Paid' },
];

const AdminPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    getAllPayments()
      .then((data) => { setPayments(data); setUsingFallback(false); })
      .catch(() => { setPayments(FALLBACK); setUsingFallback(true); });
  }, []);

  const total = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <h2 className="fw-bold mb-1">Payments</h2>
        <p className="text-muted small mb-4">All recorded payments. Total shown: Rs. {total.toFixed(2)}</p>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/payments</code>.</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Payment ID</th><th>Ticket ID</th><th>Passenger</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.paymentId}>
                <td className="fw-semibold">{p.paymentId}</td>
                <td>{p.ticketId}</td>
                <td>{p.passengerName}</td>
                <td>Rs. {p.amount}</td>
                <td>{p.payType}</td>
                <td>{new Date(p.payDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td><Badge bg={p.status === 'Paid' ? 'success' : p.status === 'Pending' ? 'warning' : 'secondary'}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminPaymentsPage;
