import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import ContactNumbersInput from './ContactNumbersInput';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';

const FALLBACK_EMPLOYEES = [
  { employeeId: 1, firstName: 'Anura', lastName: 'Perera', email: 'admin@smartmove.lk', contactNumbers: ['0771234567'], role: 'ADMIN', status: 'Active', hireDate: '2024-01-10', licenseNum: '', expertiseArea: '' },
  { employeeId: 2, firstName: 'Nuwan', lastName: 'Silva', email: 'driver@smartmove.lk', contactNumbers: ['0772223344', '0112223344'], role: 'DRIVER', status: 'Active', hireDate: '2024-03-01', licenseNum: 'B1234567', expertiseArea: '' },
  { employeeId: 3, firstName: 'Saman', lastName: 'Kumara', email: 'mechanic@smartmove.lk', contactNumbers: ['0773334455'], role: 'MECHANIC', status: 'Active', hireDate: '2024-05-20', licenseNum: '', expertiseArea: 'Engine Repair' },
];

// employee table: first_name, last_name, emp_role, status, hire_date. driver.license_num, mechanic.expertise_area,
// and employee_contact holds one row per phone number.
// email + password are only for logging in (they need columns on the employee table, see the note I sent).
const emptyForm = { firstName: '', lastName: '', email: '', contactNumbers: [''], role: 'DRIVER', status: 'Active', licenseNum: '', expertiseArea: '', password: '' };

const roleBadge = (role) => ({ ADMIN: 'dark', DRIVER: 'primary', MECHANIC: 'warning' }[role] || 'secondary');

const AdminEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const load = () => {
    getAllEmployees()
      .then((data) => { setEmployees(data); setUsingFallback(false); })
      .catch(() => { setEmployees(FALLBACK_EMPLOYEES); setUsingFallback(true); });
  };
  useEffect(load, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (emp) => { setEditingId(emp.employeeId); setForm({ ...emptyForm, ...emp, contactNumbers: emp.contactNumbers && emp.contactNumbers.length ? emp.contactNumbers : [''], password: '' }); setShowModal(true); };

  const handleSave = async () => {
    setError('');
    try {
      const payload = { ...form, contactNumbers: form.contactNumbers.map((n) => n.trim()).filter((n) => n !== '') };
      if (editingId) await updateEmployee(editingId, payload);
      else await createEmployee(payload);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this employee account?')) return;
    try { await deleteEmployee(id); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold m-0">Employees</h2>
            <p className="text-muted small m-0">Create and manage Admin, Driver and Mechanic accounts. This is the only place roles are assigned — public sign-up always creates a Passenger.</p>
          </div>
          <Button style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={openAdd}>+ Add Employee</Button>
        </div>

        {usingFallback && <Alert variant="warning" className="small">Showing sample data — connect <code>GET /api/employees</code>.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light"><tr><th>Name</th><th>Email</th><th>Contact</th><th>Role</th><th>Status</th><th>Extra Info</th><th></th></tr></thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.employeeId}>
                <td className="fw-semibold">{e.firstName} {e.lastName}</td>
                <td>{e.email}</td>
                <td>{(e.contactNumbers || []).join(', ')}</td>
                <td><Badge bg={roleBadge(e.role)}>{e.role}</Badge></td>
                <td>{e.status}</td>
                <td className="text-muted small">
                  {e.role === 'DRIVER' && `License: ${e.licenseNum || '—'}`}
                  {e.role === 'MECHANIC' && `Expertise: ${e.expertiseArea || '—'}`}
                  {e.role === 'ADMIN' && '—'}
                </td>
                <td>
                  <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(e)}>Edit</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(e.employeeId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>{editingId ? 'Edit Employee' : 'Add Employee'}</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Form.Group>
            <ContactNumbersInput numbers={form.contactNumbers} setNumbers={(nums) => setForm({ ...form, contactNumbers: nums })} />
            {!editingId && (
              <Form.Group className="mb-3">
                <Form.Label>Temporary Password</Form.Label>
                <Form.Control type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="ADMIN">Admin</option>
                <option value="DRIVER">Driver</option>
                <option value="MECHANIC">Mechanic</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            {form.role === 'DRIVER' && (
              <Form.Group className="mb-3">
                <Form.Label>License Number</Form.Label>
                <Form.Control value={form.licenseNum} onChange={(e) => setForm({ ...form, licenseNum: e.target.value })} />
              </Form.Group>
            )}
            {form.role === 'MECHANIC' && (
              <Form.Group>
                <Form.Label>Expertise Area</Form.Label>
                <Form.Control value={form.expertiseArea} onChange={(e) => setForm({ ...form, expertiseArea: e.target.value })} />
              </Form.Group>
            )}
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

export default AdminEmployeesPage;
