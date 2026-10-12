import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllPassengers, deletePassenger } from '../api/passengerApi';

const FALLBACK = [
  { passengerId: 1, firstName: 'John', lastName: 'Doe', email: 'passenger@smartmove.lk', contactNumbers: ['0761112223', '0112345678'], registrationDate: '2026-01-15' },
  { passengerId: 2, firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah@example.com', contactNumbers: ['0779998887'], registrationDate: '2026-03-02' },
];

const AdminPassengersPage = () => {
  const [passengers, setPassengers] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    getAllPassengers()
      .then((data) => { setPassengers(data); setUsingFallback(false); })
      .catch(() => { setPassengers(FALLBACK); setUsingFallback(true); });
  };
  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this passenger account?')) return;
    try { await deletePassenger(id); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <h2 className="fw-bold mb-1">Passengers</h2>
        <p className="text-muted small mb-4">Registered passenger accounts (self-registered — accounts aren't created here).</p>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/passengers</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Name</th><th>Email</th><th>Contact</th><th>Registered</th><th></th></tr></thead>
          <tbody>
            {passengers.map((p) => (
              <tr key={p.passengerId}>
                <td className="fw-semibold">{p.firstName} {p.lastName}</td>
                <td>{p.email}</td>
                <td>{(p.contactNumbers || []).join(', ')}</td>
                <td>{p.registrationDate}</td>
                <td><Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.passengerId)}>Remove</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminPassengersPage;
