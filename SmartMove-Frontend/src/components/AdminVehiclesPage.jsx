import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllVehicles, createVehicle, updateVehicle, deleteVehicle } from '../api/vehicleApi';

const FALLBACK_VEHICLES = [
  { vehicleId: 1, registrationNum: 'ND-4521', vehicleType: 'BUS', manuYear: 2019, model: 'Ashok Leyland', capacity: 45, status: 'Active', acType: 'AC', routeType: 'Intercity' },
  { vehicleId: 2, registrationNum: 'PV-8890', vehicleType: 'VAN', manuYear: 2021, model: 'Toyota HiAce', capacity: 14, status: 'Active', fuelType: 'Diesel' },
  { vehicleId: 3, registrationNum: 'NC-1122', vehicleType: 'BUS', manuYear: 2016, model: 'TATA', capacity: 52, status: 'Maintenance', acType: 'Non-AC', routeType: 'Express' },
];

// One vehicle table: vehicleType decides which of the extra fields apply.
//   BUS -> acType, routeType      VAN -> fuelType
const emptyForm = {
  registrationNum: '', vehicleType: 'BUS', manuYear: '', model: '', capacity: '', status: 'Active',
  acType: 'AC', routeType: 'Intercity', fuelType: 'Diesel',
};

const AdminVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const load = () => {
    getAllVehicles()
      .then((data) => { setVehicles(data); setUsingFallback(false); })
      .catch(() => { setVehicles(FALLBACK_VEHICLES); setUsingFallback(true); });
  };

  useEffect(load, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (v) => { setEditingId(v.vehicleId); setForm({ ...emptyForm, ...v, manuYear: v.manuYear ?? '' }); setShowModal(true); };

  const handleSave = async () => {
    setError('');
    if (!form.registrationNum.trim() || !form.capacity) {
      setError('Registration number and capacity are required.');
      return;
    }
    // Only send the fields that belong to this vehicle type; the others stay empty in the database.
    const payload = {
      ...form,
      manuYear: form.manuYear === '' ? null : Number(form.manuYear),
      capacity: Number(form.capacity),
      acType: form.vehicleType === 'BUS' ? form.acType : null,
      routeType: form.vehicleType === 'BUS' ? form.routeType : null,
      fuelType: form.vehicleType === 'VAN' ? form.fuelType : null,
    };
    try {
      if (editingId) {
        await updateVehicle(editingId, payload);
      } else {
        await createVehicle(payload);
      }
      setShowModal(false);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await deleteVehicle(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold m-0">Vehicles</h2>
            <p className="text-muted small m-0">Manage the vehicle fleet.</p>
          </div>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={openAdd}>
            + Add Vehicle
          </Button>
        </div>

        {usingFallback && (
          <Alert variant="warning" className="small">
            Showing sample data — connect <code>GET /api/vehicles</code> to manage real records.
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>Reg. Number</th>
              <th>Type</th>
              <th>Details</th>
              <th>Model</th>
              <th>Year</th>
              <th>Capacity</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.vehicleId}>
                <td className="fw-semibold">{v.registrationNum}</td>
                <td>{v.vehicleType}</td>
                <td className="text-muted small">
                  {v.vehicleType === 'BUS' ? `${v.acType || '-'} · ${v.routeType || '-'}` : v.fuelType || '-'}
                </td>
                <td>{v.model}</td>
                <td>{v.manuYear}</td>
                <td>{v.capacity}</td>
                <td><Badge bg={v.status === 'Active' ? 'success' : 'warning'}>{v.status}</Badge></td>
                <td>
                  <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(v)}>Edit</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(v.vehicleId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingId ? 'Edit Vehicle' : 'Add Vehicle'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                value={form.registrationNum}
                onChange={(e) => setForm({ ...form, registrationNum: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={form.vehicleType}
                onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
              >
                <option value="BUS">Bus</option>
                <option value="VAN">Van</option>
              </Form.Select>
            </Form.Group>

            {/* Shown depending on vehicle type (one vehicle table, some columns stay empty) */}
            {form.vehicleType === 'BUS' ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>AC Type</Form.Label>
                  <Form.Select
                    value={form.acType}
                    onChange={(e) => setForm({ ...form, acType: e.target.value })}
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Route Type</Form.Label>
                  <Form.Select
                    value={form.routeType}
                    onChange={(e) => setForm({ ...form, routeType: e.target.value })}
                  >
                    <option value="Intercity">Intercity</option>
                    <option value="Express">Express</option>
                    <option value="City">City</option>
                  </Form.Select>
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select
                  value={form.fuelType}
                  onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                </Form.Select>
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Manufacture Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 2019"
                value={form.manuYear}
                onChange={(e) => setForm({ ...form, manuYear: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
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

export default AdminVehiclesPage;
