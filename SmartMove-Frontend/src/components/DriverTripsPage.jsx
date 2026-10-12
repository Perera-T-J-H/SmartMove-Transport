import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Alert, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTripsByDriver, updateTripStatus } from '../api/tripApi';

const FALLBACK_TRIPS = [
  { tripId: 1, routeLabel: 'Colombo → Kandy', vehicleReg: 'ND-4521', depaDatetime: '2026-09-27T08:00:00', status: 'Scheduled' },
  { tripId: 2, routeLabel: 'Kandy → Colombo', vehicleReg: 'ND-4521', depaDatetime: '2026-09-27T16:00:00', status: 'Scheduled' },
];
// The trip table only allows Scheduled, Completed and Cancelled, so a driver can mark a trip Completed.
const NEXT_STATUS = { Scheduled: 'Completed' };
const statusVariant = (s) => ({ Scheduled: 'primary', Completed: 'dark', Cancelled: 'danger' }[s] || 'secondary');

const DriverTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const load = () => {
    if (!currentUser) return;
    getTripsByDriver(currentUser.id)
      .then((data) => { setTrips(data); setUsingFallback(false); })
      .catch(() => { setTrips(FALLBACK_TRIPS); setUsingFallback(true); });
  };

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }
    load();
    // eslint-disable-next-line
  }, []);

  const handleAdvance = async (trip) => {
    const next = NEXT_STATUS[trip.status];
    if (!next) return;
    try {
      await updateTripStatus(trip.tripId, next);
    } catch { /* fine offline — still update the UI below */ }
    setTrips((prev) => prev.map((t) => (t.tripId === trip.tripId ? { ...t, status: next } : t)));
  };

  const handleLogout = () => { localStorage.removeItem('currentUser'); navigate('/login'); };

  if (!currentUser) return null;

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="px-4 py-3 d-flex justify-content-between">
        <span className="fw-bold text-white">SmartMove — Driver Portal</span>
        <div className="text-white">
          {currentUser.firstName} {currentUser.lastName}
          <Button size="sm" variant="outline-light" className="ms-3" onClick={handleLogout}>Logout</Button>
        </div>
      </Navbar>

      <Container className="py-4">
        <h3 className="fw-bold mb-1">My Trips</h3>
        <p className="text-muted small mb-4">Mark a trip as completed once you have finished it.</p>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/trips?driverId=</code>.</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Route</th><th>Vehicle</th><th>Departure</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.tripId}>
                <td>{t.routeLabel}</td>
                <td>{t.vehicleReg}</td>
                <td>{new Date(t.depaDatetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td><Badge bg={statusVariant(t.status)}>{t.status}</Badge></td>
                <td>
                  {NEXT_STATUS[t.status] && (
                    <Button size="sm" style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => handleAdvance(t)}>
                      Mark as {NEXT_STATUS[t.status]}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default DriverTripsPage;
