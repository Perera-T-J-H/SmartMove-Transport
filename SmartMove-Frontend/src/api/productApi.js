import { GATEWAY_BASE } from './config';

const BASE = `${GATEWAY_BASE}/product-service/api/products`;

export async function getAllProducts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load products.');
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function createProduct(product, role) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Role': role
    },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Failed to create product (admin only).');
  return res.json();
}
export async function updateProduct(product, role) {
  const res = await fetch(BASE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Role': role
    },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Failed to update product (admin only).');
  return res.json();
}

export async function deleteProduct(id, role) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: { 'X-User-Role': role }
  });
  if (!res.ok) throw new Error('Failed to delete product (admin only).');
}