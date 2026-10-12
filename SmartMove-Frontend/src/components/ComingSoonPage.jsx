import React from 'react';
import { Container } from 'react-bootstrap';

const ComingSoonPage = ({ title }) => (
  <Container className="text-center py-5">
    <h2 className="fw-bold">{title}</h2>
    <p className="text-muted">This page hasn't been built yet — next on the list.</p>
  </Container>
);

export default ComingSoonPage;
