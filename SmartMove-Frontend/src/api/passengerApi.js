import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/passengers`;

export async function getAllPassengers() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load passengers.');
  return res.json();
}
export async function deletePassenger(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete passenger.');
}
