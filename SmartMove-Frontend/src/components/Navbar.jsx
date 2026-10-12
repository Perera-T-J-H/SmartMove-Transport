import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white border-bottom w-100 sticky-top">
      <Container fluid className="px-4 px-lg-5">
        <div className="d-flex align-items-center justify-content-between" style={{ height: '68px' }}>

          {/* Logo */}
          <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center m-0 p-0">
            <span className="fw-bold fs-4" style={{ color: '#2563eb', fontFamily: 'sans-serif' }}>SmartMove</span>
          </BootstrapNavbar.Brand>

          {/* Center nav — same flat structure as magiya.lk: Journeys / My Tickets / Contact, no offers link */}
          <Nav className="gap-4 d-none d-md-flex">
            <Nav.Link as={Link} to="/" className="fw-semibold text-dark">Home</Nav.Link>
            <Nav.Link as={Link} to="/routes" className="fw-semibold text-dark">Journeys</Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/my-tickets" className="fw-semibold text-dark">My Tickets</Nav.Link>
            )}
            <Nav.Link as={Link} to="/contact" className="fw-semibold text-dark">Contact</Nav.Link>
          </Nav>

          {/* Right side — login/signup or account */}
          <div className="d-flex align-items-center gap-3">
            {currentUser ? (
              <NavDropdown
                align="end"
                title={
                  <div
                    className="d-inline-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#2563eb', fontSize: '15px', cursor: 'pointer' }}
                  >
                    {currentUser.firstName.charAt(0).toUpperCase()}
                  </div>
                }
                id="user-profile-dropdown"
              >
                <NavDropdown.Item as={Link} to="/my-tickets">My Tickets</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/feedback">Leave Feedback</NavDropdown.Item>
                {currentUser.role === 'PASSENGER' && (
                  <NavDropdown.Item as={Link} to="/profile-settings">Update Profile</NavDropdown.Item>
                )}
                {currentUser.role === 'ADMIN' && (
                  <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Dashboard</NavDropdown.Item>
                )}
                {currentUser.role === 'DRIVER' && (
                  <NavDropdown.Item as={Link} to="/driver/trips">My Trips</NavDropdown.Item>
                )}
                {currentUser.role === 'MECHANIC' && (
                  <NavDropdown.Item as={Link} to="/mechanic/jobs">My Maintenance Jobs</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-semibold">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link
                to="/login"
                className="fw-semibold text-white text-decoration-none px-4 py-2 rounded"
                style={{ backgroundColor: '#2563eb' }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
