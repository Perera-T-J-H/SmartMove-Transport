import React, { useState, useEffect } from 'react';
import { Container, Table, Card, Badge } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllUsers } from '../api/userApi';

const AdminUsersPage = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(setRegisteredUsers)
      .catch(err => console.error('Failed to load users:', err));
  }, []);

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="mb-4">
          <h2 className="fw-bold text-dark m-0">Registered Customers Database Log</h2>
          <p className="text-muted small m-0">Monitor profiles safely. Passwords remain securely encrypted on private customer instances.</p>
        </div>

        <Card className="border-0 shadow-sm rounded-3 p-3 bg-white">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0" borderless>
              <thead className="table-light border-bottom">
                <tr className="small text-muted text-uppercase" style={{ fontSize: '12px' }}>
                  <th>UID</th>
                  <th>Full Identity Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th className="text-end px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {registeredUsers.map((user) => (
                  <tr key={user.id} className="border-bottom border-light-subtle">
                    <td className="text-secondary font-monospace small">#USR-00{user.id}</td>
                    <td className="fw-semibold text-dark">{user.firstName} {user.lastName}</td>
                    <td className="text-muted font-monospace">{user.email}</td>
                    <td className="text-secondary">{user.role}</td>
                    <td className="text-end px-3">
                      <Badge bg="success" className="rounded-pill px-3 py-1 fw-medium" style={{ fontSize: '11px' }}>Active Client</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminUsersPage;