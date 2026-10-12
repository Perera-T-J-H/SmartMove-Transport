import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuGroups = [
    {
      label: null,
      items: [{ name: 'Dashboard', path: '/admin/dashboard', icon: '📊' }],
    },
    {
      label: 'Operations',
      items: [
        { name: 'Vehicles', path: '/admin/vehicles', icon: '🚌' },
        { name: 'Routes', path: '/admin/routes', icon: '🗺️' },
        { name: 'Trip Scheduling', path: '/admin/trips', icon: '📅' },
      ],
    },
    {
      label: 'People',
      items: [
        { name: 'Passengers', path: '/admin/passengers', icon: '🧑‍🤝‍🧑' },
        { name: 'Employees', path: '/admin/employees', icon: '🪪' },
      ],
    },
    {
      label: 'Commercial',
      items: [
        { name: 'Tickets', path: '/admin/tickets', icon: '🎫' },
        { name: 'Payments', path: '/admin/payments', icon: '💳' },
      ],
    },
    {
      label: 'Support',
      items: [
        { name: 'Maintenance', path: '/admin/maintenance', icon: '🔧' },
        { name: 'Feedback', path: '/admin/feedback', icon: '💬' },
      ],
    },
    {
      label: null,
      items: [{ name: 'Return to Site', path: '/', icon: '🏠' }],
    },
  ];

  return (
    <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px', minHeight: '100vh', flexShrink: 0 }}>
      <h4 className="fw-bold mb-4 text-center py-2 border-bottom text-uppercase" style={{ color: '#3b82f6', fontFamily: 'sans-serif', fontSize: '1.1rem' }}>
        SmartMove Admin
      </h4>
      {menuGroups.map((group, gIdx) => (
        <div key={gIdx} className="mb-2">
          {group.label && (
            <div className="text-uppercase text-secondary small fw-bold px-2 pt-3 pb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
              {group.label}
            </div>
          )}
          <Nav className="flex-column gap-1">
            {group.items.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Nav.Link
                  key={idx}
                  as={Link}
                  to={item.path}
                  className={`text-white rounded py-2 px-3 d-flex align-items-center gap-2 ${isActive ? 'fw-bold' : ''}`}
                  style={{
                    transition: 'all 0.2s',
                    backgroundColor: isActive ? '#2563eb' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span>{item.name}</span>
                </Nav.Link>
              );
            })}
          </Nav>
        </div>
      ))}
    </div>
  );
};

export default AdminSidebar;
