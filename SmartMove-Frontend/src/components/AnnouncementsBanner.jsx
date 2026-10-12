import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { getActiveAnnouncements } from '../api/announcementApi';

const FALLBACK = [
  { announcementId: 1, title: 'Service Notice', message: 'Colombo–Galle route running 15 mins behind schedule today due to road works.', priority: 'high' },
];

const AnnouncementsBanner = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getActiveAnnouncements().then(setAnnouncements).catch(() => setAnnouncements(FALLBACK));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <Container className="pt-3">
      {announcements.map((a) => (
        <Alert key={a.announcementId} variant={a.priority === 'high' ? 'warning' : 'info'} className="py-2 small mb-2">
          <strong>{a.title}:</strong> {a.message}
        </Alert>
      ))}
    </Container>
  );
};

export default AnnouncementsBanner;
