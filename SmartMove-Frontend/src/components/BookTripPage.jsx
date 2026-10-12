import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllRoutes } from '../api/routeApi';
import { getTripsByRoute, getBookedSeats } from '../api/tripApi';
import { createTicket } from '../api/ticketApi';

const FALLBACK_ROUTES = [
  { routeId: 1, origin: 'Colombo', destination: 'Kandy' },
  { routeId: 2, origin: 'Colombo', destination: 'Galle' },
];
const FALLBACK_TRIPS = [
  { tripId: 101, depaDatetime: '2026-09-27T08:00:00', vehicleReg: 'ND-4521', vehicleType: 'BUS', acType: 'AC', capacity: 40, basePrice: 450 },
  { tripId: 102, depaDatetime: '2026-09-27T14:30:00', vehicleReg: 'PV-8890', vehicleType: 'VAN', capacity: 14, basePrice: 600 },
];
const FALLBACK_BOOKED = ['1A', '3B', '5C'];

// No Seat table: seats are just labels built from the vehicle's capacity (4 per row: 1A, 1B, 1C, 1D, 2A ...).
// A seat counts as taken when a ticket for this trip already has that seat number.
const SEATS_PER_ROW = 4;
const buildSeatLabels = (capacity) =>
  Array.from({ length: capacity || 0 }, (_, i) =>
    `${Math.floor(i / SEATS_PER_ROW) + 1}${String.fromCharCode(65 + (i % SEATS_PER_ROW))}`);

const BookTripPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(searchParams.get('routeId') || '');
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');

  // Load routes once
  useEffect(() => {
    getAllRoutes().then(setRoutes).catch(() => setRoutes(FALLBACK_ROUTES));
  }, []);

  // Load trips whenever the selected route changes
  useEffect(() => {
    if (!selectedRouteId) return;
    getTripsByRoute(selectedRouteId).then(setTrips).catch(() => setTrips(FALLBACK_TRIPS));
    setSelectedTripId(null);
    setBookedSeats([]);
    setSelectedSeat(null);
  }, [selectedRouteId]);

  // Load the already-booked seat numbers whenever a trip is picked
  useEffect(() => {
    if (!selectedTripId) return;
    getBookedSeats(selectedTripId).then(setBookedSeats).catch(() => setBookedSeats(FALLBACK_BOOKED));
    setSelectedSeat(null);
  }, [selectedTripId]);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const selectedTrip = trips.find((t) => t.tripId === selectedTripId);

  const handleConfirm = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setBooking(true);
    setError('');
    try {
      const ticket = await createTicket({
        tripId: selectedTripId,
        passengerId: currentUser.id,
        seatNum: selectedSeat,
      });
      const route = routes.find((r) => String(r.routeId) === String(selectedRouteId));
      navigate('/payment', {
        state: {
          ticketId: ticket.ticketId,
          amount: ticket.price ?? selectedTrip?.basePrice,
          routeLabel: route ? `${route.origin} → ${route.destination}` : undefined,
          seatNum: selectedSeat,
        },
      });
    } catch (e) {
      setError(e.message || 'Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Book a Trip</h2>

      {/* Step 1: Route */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">1. Select a Route</Form.Label>
        <Form.Select value={selectedRouteId} onChange={(e) => setSelectedRouteId(e.target.value)}>
          <option value="">-- Choose a route --</option>
          {routes.map((r) => (
            <option key={r.routeId} value={r.routeId}>{r.origin} → {r.destination}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Step 2: Trip */}
      {selectedRouteId && (
        <div className="mb-4">
          <div className="fw-semibold mb-2">2. Select a Trip</div>
          <Row className="g-3">
            {trips.map((t) => (
              <Col md={6} key={t.tripId}>
                <Card
                  onClick={() => setSelectedTripId(t.tripId)}
                  className={`p-3 ${selectedTripId === t.tripId ? 'border-primary border-2' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">{new Date(t.depaDatetime).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="text-muted small">{t.vehicleReg} ({t.vehicleType}{t.acType ? ` · ${t.acType}` : ''})</div>
                    </div>
                    <div className="fw-bold text-primary">Rs. {t.basePrice}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Step 3: Seat */}
      {selectedTripId && (
        <div className="mb-4">
          <div className="fw-semibold mb-2">3. Select a Seat</div>
          <div className="d-flex flex-wrap gap-2">
            {buildSeatLabels(selectedTrip?.capacity).map((label) => {
              const taken = bookedSeats.includes(label);
              return (
                <Button
                  key={label}
                  disabled={taken}
                  variant={selectedSeat === label ? 'primary' : taken ? 'secondary' : 'outline-primary'}
                  style={{ width: '52px', height: '48px' }}
                  onClick={() => setSelectedSeat(label)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
          {selectedSeat && <div className="text-muted small mt-2">Selected seat: {selectedSeat}</div>}
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Step 4: Confirm */}
      {selectedSeat && (
        <Button
          size="lg"
          style={{ backgroundColor: '#2563eb', border: 'none' }}
          onClick={handleConfirm}
          disabled={booking}
        >
          {booking ? <Spinner size="sm" animation="border" /> : `Confirm Booking — Seat ${selectedSeat}`}
        </Button>
      )}
    </Container>
  );
};

export default BookTripPage;
