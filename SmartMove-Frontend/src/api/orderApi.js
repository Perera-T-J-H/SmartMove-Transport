import { GATEWAY_BASE } from './config';

const BASE = `${GATEWAY_BASE}/order-service/api/orders`;

export async function placeOrder(orderPayload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to place order.');
  }
  return res.json();
}

export async function getAllOrders() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load orders.');
  return res.json();
}