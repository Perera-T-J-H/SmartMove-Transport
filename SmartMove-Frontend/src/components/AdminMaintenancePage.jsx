import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllMaintenance, createMaintenance, updateMaintenance, deleteMaintenance } from '../api/maintenanceApi';
import { getAllVehicles } from '../api/vehicleApi';
import { getAllEmployees } from '../api/employeeApi';

const FALLBACK = [
  { mainId: 1, vehicleId: 3, vehicleReg: 'NC-1122', employeeId: 3, mechanicName: 'Saman Kumara', serviceType: 'Engine Oil Change', cost: 8500, repairedDate: '2026-09-20' },
];
// maintenance table: main_id, cost, repared_date, service_type, employee_id (the mechanic), vehicle_id
const today = () => new Date().toISOString().slice(0, 10);
const emptyForm = { vehicleId: '', employeeId: '', serviceType: '', cost: '', repairedDate: today() };

const AdminMaintenancePage = () => {
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const load = () => {
    getAllMaintenance()
      .then((data) => { setRecords(data); setUsingFallback(false); })
      .catch(() => { setRecords(FALLBACK); setUsingFallback(true); });
  };

  useEffect(() => {
    load();
    getAllVehicles().then(setVehicles).catch(() => setVehicles([]));
    getAllEmployees().then((emps) => setMechanics(emps.filter((e) => e.role === 'MECHANIC'))).catch(() => setMechanics([]));
  }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (r) => { setEditingId(r.mainId); setForm({ ...emptyForm, ...r, repairedDate: (r.repairedDate || '').slice(0, 10) }); setShowModal(true); };

  const handleSave = async () => {
    setError('');
    try {
      if (editingId) await updateMaintenance(editingId, form);
      else await createMaintenance(form);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this maintenance record?')) return;
    try { await deleteMaintenance(id); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold m-0">Maintenance</h2>
            <p className="text-muted small m-0">Log and track vehicle maintenance work.</p>
          </div>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={openAdd}>+ Log Maintenance</Button>
        </div>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/maintenance</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Vehicle</th><th>Mechanic</th><th>Service Type</th><th>Cost</th><th>Repaired Date</th><th></th></tr></thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.mainId}>
                <td className="fw-semibold">{r.vehicleReg}</td>
                <td>{r.mechanicName}</td>
                <td>{r.serviceType}</td>
                <td>Rs. {r.cost}</td>
                <td>{r.repairedDate}</td>
                <td>
                  <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(r)}>Edit</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(r.mainId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>{editingId ? 'Edit Record' : 'Log Maintenance'}</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Vehicle</Form.Label>
              <Form.Select value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
                <option value="">-- Select vehicle --</option>
                {vehicles.map((v) => <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNum}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mechanic</Form.Label>
              <Form.Select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
                <option value="">-- Select mechanic --</option>
                {mechanics.map((m) => <option key={m.employeeId} value={m.employeeId}>{m.firstName} {m.lastName}</option>)}
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

export default AdminMaintenancePage;
