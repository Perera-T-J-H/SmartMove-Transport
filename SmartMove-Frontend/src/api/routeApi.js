import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/routes`;

async function check(res, fallback) {
  if (res.ok) return;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || fallback);
}

export async function getAllRoutes() {
  const res = await fetch(BASE);
  await check(res, 'Failed to load routes.');
  return res.json();
}
export async function createRoute(route) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(route) });
  await check(res, 'Failed to create route.');
  return res.json();
}
export async function updateRoute(id, route) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(route) });
  await check(res, 'Failed to update route.');
  return res.json();
}
export async function deleteRoute(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await check(res, 'Failed to delete route.');
}