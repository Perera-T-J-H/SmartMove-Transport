import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getMaintenanceByMechanic, createMaintenance } from '../api/maintenanceApi';
import { getAllVehicles } from '../api/vehicleApi';

const FALLBACK_JOBS = [
  { mainId: 1, vehicleReg: 'NC-1122', serviceType: 'Engine Oil Change', cost: 8500, repairedDate: '2026-09-20' },
];
const today = () => new Date().toISOString().slice(0, 10);
const emptyForm = { vehicleId: '', serviceType: '', cost: '', repairedDate: today() };

const MechanicJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const load = () => {
    if (!currentUser) return;
    getMaintenanceByMechanic(currentUser.id)
      .then((data) => { setJobs(data); setUsingFallback(false); })
      .catch(() => { setJobs(FALLBACK_JOBS); setUsingFallback(true); });
  };

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }
    load();
    getAllVehicles().then(setVehicles).catch(() => setVehicles([]));
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    setError('');
    try {
      await createMaintenance({ ...form, employeeId: currentUser.id });
      setShowModal(false);
      setForm(emptyForm);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleLogout = () => { localStorage.removeItem('currentUser'); navigate('/login'); };

  if (!currentUser) return null;

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="px-4 py-3 d-flex justify-content-between">
        <span className="fw-bold text-white">SmartMove — Mechanic Portal</span>
        <div className="text-white">
          {currentUser.firstName} {currentUser.lastName}
          <Button size="sm" variant="outline-light" className="ms-3" onClick={handleLogout}>Logout</Button>
        </div>
      </Navbar>

      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold m-0">My Maintenance Jobs</h3>
            <p className="text-muted small m-0">Work you've logged against vehicles.</p>
          </div>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => setShowModal(true)}>+ Log New Job</Button>
        </div>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/maintenance?employeeId=</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Vehicle</th><th>Service Type</th><th>Cost</th><th>Repaired Date</th></tr></thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.mainId}>
                <td className="fw-semibold">{j.vehicleReg}</td>
                <td>{j.serviceType}</td>
                <td>Rs. {j.cost}</td>
                <td>{j.repairedDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>Log Maintenance Job</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Vehicle</Form.Label>
              <Form.Select value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
                <option value="">-- Select vehicle --</option>
                {vehicles.map((v) => <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNum}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Type</Form.Label>
              <Form.Control value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cost (Rs.)</Form.Label>
              <Form.Control type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repaired Date</Form.Label>
              <Form.Control type="date" value={form.repairedDate} onChange={(e) => setForm({ ...form, repairedDate: e.target.value })} />
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

export default MechanicJobsPage;
