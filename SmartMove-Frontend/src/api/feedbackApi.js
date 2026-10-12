import { GATEWAY_BASE } from './config';
// Mongo-backed — separate from the Oracle-backed endpoints above.
const BASE = `${GATEWAY_BASE}/api/feedback`;

async function check(res, fallback) {
  if (res.ok) return;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || fallback);
}

export async function getAllFeedback() {
  const res = await fetch(BASE);
  await check(res, 'Failed to load feedback.');
  return res.json(); // [{ feedbackId, passengerName, routeLabel, rating, comment, submitDate }]
}
export async function getFeedbackByRoute(routeId) {
  const res = await fetch(`${BASE}?routeId=${routeId}`);
  await check(res, 'Failed to load feedback for this route.');
  return res.json();
}
export async function searchFeedback(keyword) {
  const res = await fetch(`${BASE}/search?keyword=${encodeURIComponent(keyword)}`);
  await check(res, 'Search failed.');
  return res.json();
}
export async function submitFeedback(feedback) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feedback) });
  await check(res, 'Failed to submit feedback.');
  return res.json();
}