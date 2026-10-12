import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/employees`;

async function check(res, fallback) {
  if (res.ok) return;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || fallback);
}

export async function getAllEmployees() {
  const res = await fetch(BASE);
  await check(res, 'Failed to load employees.');
  return res.json(); // [{ employeeId, firstName, lastName, email, contactNumbers, role, status, hireDate, licenseNum, expertiseArea }]
}
export async function createEmployee(employee) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(employee) });
  await check(res, 'Failed to add employee.');
  return res.json();
}
export async function updateEmployee(id, employee) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(employee) });
  await check(res, 'Failed to update employee.');
  return res.json();
}
export async function deleteEmployee(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await check(res, 'Failed to delete employee.');
}