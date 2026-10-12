import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllRoutes } from '../api/routeApi';

const FALLBACK_ROUTES = [
  { routeId: 1, origin: 'Colombo', destination: 'Kandy', distanceKm: 115 },
  { routeId: 2, origin: 'Colombo', destination: 'Galle', distanceKm: 116 },
  { routeId: 3, origin: 'Kandy', destination: 'Nuwara Eliya', distanceKm: 78 },
];

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRoutes()
      .then((data) => setRoutes(data))
      .catch(() => {
        setRoutes(FALLBACK_ROUTES);
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-1">Available Routes</h2>
      <p className="text-muted mb-4">Pick a route to see upcoming trips and book a seat.</p>

      {usingFallback && (
        <Alert variant="warning" className="small">
          Showing sample routes — connect <code>GET /api/routes</code> on your backend to see live data.
        </Alert>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table hover responsive className="bg-white shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>Origin</th>
              <th>Destination</th>
              <th>Distance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.routeId}>
                <td>{r.origin}</td>
                <td>{r.destination}</td>
                <td>{r.distanceKm} km</td>
                <td>
                  <Button
                    size="sm"
                    style={{ backgroundColor: '#2563eb', border: 'none' }}
                    onClick={() => navigate(`/book?routeId=${r.routeId}`)}
                  >
                    View Trips
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RoutesPage;
