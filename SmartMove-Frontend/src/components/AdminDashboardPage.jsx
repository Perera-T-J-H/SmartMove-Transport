import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { GATEWAY_BASE } from '../api/config';

// Placeholder data shown until the backend endpoints are live.
// Replace by wiring the fetch calls below to your real Spring Boot controllers.
const FALLBACK_SUMMARY = { activeTrips: 24, todaysRevenue: 4250.0, vehiclesInMaintenance: 3, newFeedback: 12 };
const FALLBACK_TRIPS = [
  { tripId: 'TRP-1001', origin: 'Colombo', destination: 'Kandy', vehicleReg: 'ND-4521', vehicleType: 'Bus', driverName: 'Kamal Perera', depaDatetime: '2026-09-26T08:00:00', status: 'Scheduled' },
  { tripId: 'TRP-1002', origin: 'Colombo', destination: 'Galle', vehicleReg: 'PV-8890', vehicleType: 'Van', driverName: 'Nuwan Silva', depaDatetime: '2026-09-26T09:30:00', status: 'Scheduled' },
  { tripId: 'TRP-1003', origin: 'Kandy', destination: 'Nuwara Eliya', vehicleReg: 'NC-1122', vehicleType: 'Bus', driverName: 'Saman Kumara', depaDatetime: '2026-09-26T11:00:00', status: 'Completed' },
];
// "Vehicles due for maintenance": the backend returns each vehicle's last repair (maintenance.repared_date).
const FALLBACK_MAINTENANCE = [
  { vehicleReg: 'NC-1122', vehicleType: 'Bus', serviceType: 'Engine Oil Change', repairedDate: '2026-03-12' },
  { vehicleReg: 'PV-5544', vehicleType: 'Van', serviceType: 'Brake Inspection', repairedDate: '2026-05-30' },
];
const DUE_AFTER_DAYS = 180; // a vehicle is due when its last repair is older than this
const daysSince = (date) => Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
const FALLBACK_FEEDBACK = [
  { passengerName: 'John Doe', routeLabel: 'Colombo-Kandy', rating: 4, comment: 'Great trip, the AC was perfectly regulated. Driver was very professional.' },
  { passengerName: 'Sarah Jenkins', routeLabel: 'Colombo-Galle', rating: 3, comment: 'Comfortable seats, but departure was delayed by 15 minutes.' },
];

const statusVariant = (status) => {
  switch (status) {
    case 'Scheduled': return 'primary';
    case 'Completed': return 'dark';
    case 'Cancelled': return 'danger';
    default: return 'secondary';
  }
};

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(FALLBACK_SUMMARY);
  const [trips, setTrips] = useState(FALLBACK_TRIPS);
  const [maintenance, setMaintenance] = useState(FALLBACK_MAINTENANCE);
  const [feedback, setFeedback] = useState(FALLBACK_FEEDBACK);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    // Swap in your real endpoints as you build the backend.
    // Each call independently falls back to placeholder data on failure,
    // so the dashboard still renders while the API isn't finished.
    const loadAll = async () => {
      let liveDataLoaded = false;
      try {
        const res = await fetch(`${GATEWAY_BASE}/api/dashboard/summary`);
        if (res.ok) { setSummary(await res.json()); liveDataLoaded = true; }
      } catch (_) { /* keep fallback */ }

      try {
        const res = await fetch(`${GATEWAY_BASE}/api/trips/active`);
        if (res.ok) { setTrips(await res.json()); liveDataLoaded = true; }
      } catch (_) { /* keep fallback */ }

      try {
        const res = await fetch(`${GATEWAY_BASE}/api/maintenance/pending`);
        if (res.ok) { setMaintenance(await res.json()); liveDataLoaded = true; }
      } catch (_) { /* keep fallback */ }

      try {
        const res = await fetch(`${GATEWAY_BASE}/api/feedback/recent`);
        if (res.ok) { setFeedback(await res.json()); liveDataLoaded = true; }
      } catch (_) { /* keep fallback */ }

      setUsingFallback(!liveDataLoaded);
    };
    loadAll();
  }, []);

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="mb-4">
          <h2 className="fw-bold text-dark m-0">Operational Dashboard</h2>
          <p className="text-muted small m-0">Live trip, maintenance and feedback overview.</p>
        </div>

        {usingFallback && (
          <Alert variant="warning" className="border-0 shadow-sm p-3 bg-white border-start border-warning border-4">
            <strong>Not connected:</strong> showing placeholder data. Wire up the endpoints in
            {' '}<code>AdminDashboardPage.jsx</code> to your Spring Boot API to see live figures.
          </Alert>
        )}

        {/* KPI Cards */}
        <Row className="g-3 mb-4">
          <Col xs={12} md={6} lg={3}>
            <Card className="border-0 shadow-sm rounded-3 border-start border-primary border-4">
              <Card.Body>
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">Active Trips</span>
                <h3 className="fw-bold m-0">{summary.activeTrips}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card className="border-0 shadow-sm rounded-3 border-start border-success border-4">
              <Card.Body>
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">Today's Revenue</span>
                <h3 className="fw-bold m-0">${Number(summary.todaysRevenue).toFixed(2)}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card className="border-0 shadow-sm rounded-3 border-start border-warning border-4">
              <Card.Body>
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">Vehicles in Maintenance</span>
                <h3 className="fw-bold m-0">{summary.vehiclesInMaintenance}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card className="border-0 shadow-sm rounded-3 border-start border-4" style={{ borderLeftColor: '#8b5cf6' }}>
              <Card.Body>
                <span className="text-muted text-uppercase small fw-semibold d-block mb-1">New Feedback</span>
                <h3 className="fw-bold m-0">{summary.newFeedback}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Trips */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Upcoming Trips</span>
            <Button size="sm" style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => navigate('/admin/trips')}>
              + New Trip
            </Button>
          </Card.Header>
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Trip ID</th>
                <th>Route</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Departure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.tripId}>
                  <td className="fw-semibold text-primary">{t.tripId}</td>
                  <td>{t.origin} - {t.destination}</td>
                  <td>{t.vehicleReg} ({t.vehicleType})</td>
                  <td>{t.driverName}</td>
                  <td>{new Date(t.depaDatetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td><Badge bg={statusVariant(t.status)}>{t.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Row className="g-4">
          {/* Maintenance */}
          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white fw-semibold d-flex justify-content-between align-items-center">
                Vehicles Due for Maintenance
                <Button size="sm" variant="link" className="p-0" onClick={() => navigate('/admin/maintenance')}>View All</Button>
              </Card.Header>
              <Card.Body>
                {maintenance.map((m, idx) => (
                  <div key={idx} className={`d-flex justify-content-between align-items-center ${idx < maintenance.length - 1 ? 'border-bottom pb-2 mb-2' : ''}`}>
                    <div>
                      <div className="fw-semibold">{m.vehicleType}: {m.vehicleReg}</div>
                      <div className="text-muted small">Last service: {m.serviceType} on {m.repairedDate}</div>
                    </div>
                    <div className={`fw-bold small ${daysSince(m.repairedDate) >= DUE_AFTER_DAYS ? 'text-danger' : 'text-warning'}`}>
                      {daysSince(m.repairedDate) >= DUE_AFTER_DAYS ? 'Overdue' : 'Due soon'}
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Feedback (MongoDB-backed) */}
          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white fw-semibold d-flex justify-content-between align-items-center">
                Recent Passenger Feedback
                <Button size="sm" variant="link" className="p-0" onClick={() => navigate('/admin/feedback')}>View All</Button>
              </Card.Header>
              <Card.Body>
                {feedback.map((f, idx) => (
                  <div key={idx} className="bg-light rounded p-3 mb-2">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-semibold small">{f.passengerName} <span className="text-muted fw-normal">on {f.routeLabel}</span></span>
                      <span className="text-warning small">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
                    </div>
                    <p className="text-muted small mb-0">"{f.comment}"</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboardPage;
