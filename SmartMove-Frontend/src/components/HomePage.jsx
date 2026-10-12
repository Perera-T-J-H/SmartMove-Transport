import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AnnouncementsBanner from './AnnouncementsBanner';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AnnouncementsBanner />
      {/* Hero */}
      <div
        className="d-flex align-items-center text-white"
        style={{
          height: '420px',
          backgroundImage: `linear-gradient(rgba(15,23,42,0.6), rgba(15,23,42,0.6)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1400&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <h1 className="fw-bold display-5 mb-3">Travel smarter, every day.</h1>
          <p className="fs-5 mb-4" style={{ maxWidth: '500px' }}>
            Book bus and van trips across the island in minutes — real-time scheduling, digital tickets, no queues.
          </p>
          <Button size="lg" style={{ backgroundColor: '#2563eb', border: 'none' }} onClick={() => navigate('/book')}>
            Book a Trip
          </Button>
        </Container>
      </div>

      {/* Quick feature row */}
      <Container className="my-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <h4 className="fw-bold">🗺️ Wide Route Network</h4>
            <p className="text-muted">Daily commuter, corporate and special travel routes island-wide.</p>
          </Col>
          <Col md={4}>
            <h4 className="fw-bold">🎫 Digital Booking</h4>
            <p className="text-muted">Reserve your seat and pay online — no paper tickets needed.</p>
          </Col>
          <Col md={4}>
            <h4 className="fw-bold">📍 Real-Time Trips</h4>
            <p className="text-muted">Track scheduled, boarding and on-route trips as they happen.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
