import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ContactPage = () => (
  <Container className="py-5">
    <h2 className="fw-bold mb-4">Contact Us</h2>
    <Row className="g-4">
      <Col md={4}>
        <h6 className="text-uppercase text-muted small fw-bold">Hotline</h6>
        <p>+94 11 234 5678</p>
      </Col>
      <Col md={4}>
        <h6 className="text-uppercase text-muted small fw-bold">Email</h6>
        <p>support@smartmovetransport.lk</p>
      </Col>
      <Col md={4}>
        <h6 className="text-uppercase text-muted small fw-bold">Office</h6>
        <p>SmartMove Transport Solutions, Colombo, Sri Lanka</p>
      </Col>
    </Row>
  </Container>
);

export default ContactPage;
