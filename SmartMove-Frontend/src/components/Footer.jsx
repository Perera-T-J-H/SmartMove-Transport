import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1a2536', color: '#ffffff' }} className="pt-5 pb-3 mt-auto w-100">
      <Container fluid className="px-5">
        <Row className="gy-4">
          
          {/* Column 1: Logo & Socials */}
          <Col xs={12} md={4}>
            <div className="text-start mb-3">
              <span className="fw-bold fs-3" style={{ color: '#c58d5e', fontFamily: 'sans-serif' }}>SmartMove Transport</span>
              <div className="text-muted" style={{ fontSize: '10px', marginTop: '-6px', letterSpacing: '0.5px', color: '#a0aab8' }}>
                Travel Smarter, Every Day
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '300px' }}>
              Passenger transportation across buses, vans and more — booking, tracking, and support in one place.
            </p>
            {/* Social Media Icons */}
            <div className="d-flex gap-3 mt-4" style={{ fontSize: '20px' }}>
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-pinterest"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-tiktok"></i></a>
              <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
              <a href="#" className="text-white"><i className="bi bi-threads"></i></a>
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col xs={12} md={4}>
            <h5 className="fw-bold mb-3" style={{ fontSize: '16px', letterSpacing: '0.5px' }}>QUICK LINKS</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '14px' }}>

              <li><Link to="/" className="text-decoration-none text-white-50 text-hover-white">Home</Link></li>
              <li><Link to="/routes" className="text-decoration-none text-white-50 text-hover-white">Routes</Link></li>
              <li><Link to="/book" className="text-decoration-none text-white-50 text-hover-white">Book a Trip</Link></li>
              <li><Link to="/my-tickets" className="text-decoration-none text-white-50 text-hover-white">My Tickets</Link></li>
              <li><Link to="#" className="text-decoration-none text-white-50 text-hover-white">Help Centre</Link></li>
              <li><Link to="#" className="text-decoration-none text-white-50 text-hover-white">Privacy Policy</Link></li>
              
            </ul>
          </Col>

          {/* Column 3: Contact Us */}
          <Col xs={12} md={4}>
            <h5 className="fw-bold mb-3" style={{ fontSize: '16px', letterSpacing: '0.5px' }}>CONTACT US</h5>
            <ul className="list-unstyled d-flex flex-column gap-3" style={{ fontSize: '14px', color: '#cbd5e1' }}>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt mt-1"></i>
                <span>SmartMove Transport Solutions, Colombo</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone"></i>
                <span>0112 81 81 91 / 076 626 8658</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope"></i>
                <a href="mailto:support@smartmovetransport.lk" className="text-decoration-none text-white">support@smartmovetransport.lk</a>
              </li>
            </ul>
          </Col>

        </Row>

        {/* Bottom copyright alignment divider line */}
        <hr className="border-secondary mt-5 mb-3" />
        
        <Row>
          <Col className="text-start text-muted" style={{ fontSize: '13px', color: '#94a3b8' }}>
            © 2026, SmartMove Transport Solutions
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;