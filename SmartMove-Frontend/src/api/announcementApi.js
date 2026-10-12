import { GATEWAY_BASE } from './config';
// Mongo-backed collection — travel announcements & notifications.
const BASE = `${GATEWAY_BASE}/api/announcements`;

export async function getActiveAnnouncements() {
  const res = await fetch(`${BASE}/active`);
  if (!res.ok) throw new Error('Failed to load announcements.');
  return res.json(); // [{ announcementId, title, message, postedDate, priority }]
}

export async function createAnnouncement(announcement) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(announcement),
  });
  if (!res.ok) throw new Error('Failed to post announcement.');
  return res.json();
}

export async function deleteAnnouncement(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete announcement.');
}
