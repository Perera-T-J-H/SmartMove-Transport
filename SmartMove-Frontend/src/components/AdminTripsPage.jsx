import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllTrips, createTrip, updateTrip, deleteTrip } from '../api/tripApi';
import { getAllRoutes } from '../api/routeApi';
import { getAllVehicles } from '../api/vehicleApi';
import { getAllEmployees } from '../api/employeeApi';

const FALLBACK_TRIPS = [
  { tripId: 1, routeId: 1, routeLabel: 'Colombo → Kandy', vehicleId: 1, vehicleReg: 'ND-4521', driverId: 2, driverName: 'Nuwan Silva', depaDatetime: '2026-09-27T08:00:00', arrivalDatetime: '2026-09-27T11:30:00', basePrice: 450, status: 'Scheduled' },
];
const emptyForm = { routeId: '', vehicleId: '', driverId: '', depaDatetime: '', arrivalDatetime: '', basePrice: '', status: 'Scheduled' };

const statusVariant = (s) => ({ Scheduled: 'primary', Completed: 'dark', Cancelled: 'danger' }[s] || 'secondary');

const AdminTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const load = () => {
    getAllTrips()
      .then((data) => { setTrips(data); setUsingFallback(false); })
      .catch(() => { setTrips(FALLBACK_TRIPS); setUsingFallback(true); });
  };

  useEffect(() => {
    load();
    getAllRoutes().then(setRoutes).catch(() => setRoutes([]));
    getAllVehicles().then(setVehicles).catch(() => setVehicles([]));
    getAllEmployees().then((emps) => setDrivers(emps.filter((e) => e.role === 'DRIVER'))).catch(() => setDrivers([]));
  }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (t) => { setEditingId(t.tripId); setForm(t); setShowModal(true); };

  const handleSave = async () => {
    setError('');
    try {
      if (editingId) await updateTrip(editingId, form);
      else await createTrip(form);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this trip?')) return;
    try { await deleteTrip(id); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold m-0">Trip Scheduling</h2>
            <p className="text-muted small m-0">Schedule trips by pairing a route with a vehicle and driver.</p>
          </div>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={openAdd}>+ Schedule Trip</Button>
        </div>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/trips</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Route</th><th>Vehicle</th><th>Driver</th><th>Departure</th><th>Arrival</th><th>Base Price</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.tripId}>
                <td>{t.routeLabel}</td>
                <td>{t.vehicleReg}</td>
                <td>{t.driverName}</td>
                <td>{new Date(t.depaDatetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{t.arrivalDatetime ? new Date(t.arrivalDatetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</td>
                <td>Rs. {t.basePrice}</td>
                <td><Badge bg={statusVariant(t.status)}>{t.status}</Badge></td>
                <td>
                  <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(t)}>Edit</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(t.tripId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>{editingId ? 'Edit Trip' : 'Schedule Trip'}</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Route</Form.Label>
              <Form.Select value={form.routeId} onChange={(e) => setForm({ ...form, routeId: e.target.value })}>
                <option value="">-- Select route --</option>
                {routes.map((r) => <option key={r.routeId} value={r.routeId}>{r.origin} → {r.destination}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vehicle</Form.Label>
              <Form.Select value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
                <option value="">-- Select vehicle --</option>
                {vehicles.map((v) => <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNum} ({v.vehicleType})</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Driver</Form.Label>
              <Form.Select value={form.driverId} onChange={(e) => setForm({ ...form, driverId: e.target.value })}>
                <option value="">-- Select driver --</option>
                {drivers.map((d) => <option key={d.employeeId} value={d.employeeId}>{d.firstName} {d.lastName}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departure Date & Time</Form.Label>
              <Form.Control type="datetime-local" value={form.depaDatetime} onChange={(e) => setForm({ ...form, depaDatetime: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Arrival Date & Time (optional)</Form.Label>
              <Form.Control type="datetime-local" value={form.arrivalDatetime || ''} onChange={(e) => setForm({ ...form, arrivalDatetime: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Base Price (Rs.)</Form.Label>
              <Form.Control type="number" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Scheduled</option><option>Completed</option><option>Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={handleSave}>Save</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminTripsPage;
