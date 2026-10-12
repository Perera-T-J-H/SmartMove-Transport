import { GATEWAY_BASE } from './config';

const AUTH_BASE = `${GATEWAY_BASE}/api/auth`;
const PASSENGER_BASE = `${GATEWAY_BASE}/api/passengers`;

// Login is checked by the backend against the passenger and employee tables.
// The backend returns { id, firstName, lastName, email, role } where role is PASSENGER, ADMIN, DRIVER or MECHANIC.
export async function loginUser(email, password) {
  const res = await fetch(`${AUTH_BASE}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Invalid email or password.');
  return data;
}

// Public registration always creates a Passenger — no role field sent or accepted.
export async function registerUser(userPayload) {
  const res = await fetch(`${PASSENGER_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userPayload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed.');
  return data;
}

export async function updateUser(user) {
  const res = await fetch(PASSENGER_BASE, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update profile.');
  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`${PASSENGER_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete account.');
}
