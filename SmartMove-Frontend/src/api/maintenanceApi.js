import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/maintenance`;

async function check(res, fallback) {
  if (res.ok) return;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || fallback);
}

export async function getAllMaintenance() {
  const res = await fetch(BASE);
  await check(res, 'Failed to load maintenance records.');
  return res.json();
}
// maintenance row: { mainId, cost, repairedDate, serviceType, employeeId (mechanic), vehicleId }
export async function getMaintenanceByMechanic(employeeId) {
  const res = await fetch(`${BASE}?employeeId=${employeeId}`);
  await check(res, 'Failed to load your jobs.');
  return res.json();
}
export async function createMaintenance(record) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) });
  await check(res, 'Failed to log maintenance.');
  return res.json();
}
export async function updateMaintenance(id, record) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) });
  await check(res, 'Failed to update record.');
  return res.json();
}
export async function deleteMaintenance(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await check(res, 'Failed to delete record.');
}