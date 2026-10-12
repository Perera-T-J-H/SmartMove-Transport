import { GATEWAY_BASE } from './config';
const BASE = `${GATEWAY_BASE}/api/payments`;

export async function getAllPayments() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load payments.');
  return res.json(); // [{ paymentId, ticketId, passengerName, amount, payType, payDate, status }]
}
export async function createPayment(payment) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payment) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Payment failed.');
  return data;
}