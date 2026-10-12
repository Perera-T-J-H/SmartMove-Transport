import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/tickets`;

// ticket row: trip_id, passenger_id, seat_num (price comes from the trip's base price)
export async function createTicket({ tripId, passengerId, seatNum }) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tripId, passengerId, seatNum }) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Booking failed.');
  return data;
}
export async function getTicketsByPassenger(passengerId) {
  const res = await fetch(`${BASE}?passengerId=${passengerId}`);
  if (!res.ok) throw new Error('Failed to load your tickets.');
  return res.json();
}
export async function getAllTickets() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load tickets.');
  return res.json();
}
