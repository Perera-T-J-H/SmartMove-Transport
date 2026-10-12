import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/vehicles`;

async function check(res, fallback) {
  if (res.ok) return;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || fallback);
}

export async function getAllVehicles() {
  const res = await fetch(BASE);
  await check(res, 'Failed to load vehicles.');
  return res.json();
}
export async function createVehicle(vehicle) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vehicle) });
  await check(res, 'Failed to add vehicle.');
  return res.json();
}
export async function updateVehicle(id, vehicle) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vehicle) });
  await check(res, 'Failed to update vehicle.');
  return res.json();
}
export async function deleteVehicle(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await check(res, 'Failed to delete vehicle.');
}