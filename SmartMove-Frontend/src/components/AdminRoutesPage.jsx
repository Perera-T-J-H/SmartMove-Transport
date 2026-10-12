import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllRoutes, createRoute, updateRoute, deleteRoute } from '../api/routeApi';

const FALLBACK_ROUTES = [
  { routeId: 1, origin: 'Colombo', destination: 'Kandy', distanceKm: 115 },
  { routeId: 2, origin: 'Colombo', destination: 'Galle', distanceKm: 116 },
];
const emptyForm = { origin: '', destination: '', distanceKm: '' };

const AdminRoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const load = () => {
    getAllRoutes()
      .then((data) => { setRoutes(data); setUsingFallback(false); })
      .catch(() => { setRoutes(FALLBACK_ROUTES); setUsingFallback(true); });
  };
  useEffect(load, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (r) => { setEditingId(r.routeId); setForm(r); setShowModal(true); };

  const handleSave = async () => {
    setError('');
    try {
      if (editingId) await updateRoute(editingId, form);
      else await createRoute(form);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this route?')) return;
    try { await deleteRoute(id); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold m-0">Routes</h2>
            <p className="text-muted small m-0">Manage available travel routes.</p>
          </div>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={openAdd}>+ Add Route</Button>
        </div>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/routes</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Origin</th><th>Destination</th><th>Distance (km)</th><th></th></tr></thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.routeId}>
                <td>{r.origin}</td>
                <td>{r.destination}</td>
                <td>{r.distanceKm}</td>
                <td>
                  <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(r)}>Edit</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(r.routeId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>{editingId ? 'Edit Route' : 'Add Route'}</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Origin</Form.Label>
              <Form.Control value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Distance (km)</Form.Label>
              <Form.Control type="number" value={form.distanceKm} onChange={(e) => setForm({ ...form, distanceKm: e.target.value })} />
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

export default AdminRoutesPage;
