import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/trips`;

export async function getTripsByRoute(routeId) {
  const res = await fetch(`${BASE}?routeId=${routeId}`);
  if (!res.ok) throw new Error('Failed to load trips for this route.');
  return res.json();
}
export async function getUpcomingTrips() {
  const res = await fetch(`${BASE}/active`);
  if (!res.ok) throw new Error('Failed to load trips.');
  return res.json();
}
export async function getAllTrips() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load trips.');
  return res.json();
}
export async function getTripsByDriver(driverId) {
  const res = await fetch(`${BASE}?driverId=${driverId}`);
  if (!res.ok) throw new Error('Failed to load your trips.');
  return res.json();
}
// Seat numbers already taken on this trip, e.g. ["1A", "3B"]. They come from the ticket table.
export async function getBookedSeats(tripId) {
  const res = await fetch(`${BASE}/${tripId}/booked-seats`);
  if (!res.ok) throw new Error('Failed to load booked seats.');
  return res.json();
}
export async function createTrip(trip) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(trip) });
  if (!res.ok) throw new Error('Failed to create trip.');
  return res.json();
}
export async function updateTrip(id, trip) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(trip) });
  if (!res.ok) throw new Error('Failed to update trip.');
  return res.json();
}
export async function updateTripStatus(id, status) {
  const res = await fetch(`${BASE}/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
  if (!res.ok) throw new Error('Failed to update status.');
  return res.json();
}
export async function deleteTrip(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete trip.');
}
