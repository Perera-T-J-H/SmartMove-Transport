import React from 'react';
import { Form, Button } from 'react-bootstrap';

// Lets a user enter one or more phone numbers (multivalued attribute).
// Each number becomes its own row in the passenger_contact table on the backend.
const ContactNumbersInput = ({ numbers, setNumbers }) => {
  const updateNumber = (index, value) => {
    setNumbers(numbers.map((n, i) => (i === index ? value : n)));
  };
  const addNumber = () => setNumbers([...numbers, '']);
  const removeNumber = (index) => setNumbers(numbers.filter((_, i) => i !== index));

  return (
    <Form.Group className="mb-3">
      <Form.Label className="small fw-semibold text-secondary">Contact Numbers</Form.Label>
      {numbers.map((num, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <Form.Control
            type="tel"
            placeholder="e.g. 0771234567"
            className="rounded-0 py-2"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#fcfcfc' }}
            value={num}
            onChange={(e) => updateNumber(index, e.target.value)}
          />
          {numbers.length > 1 && (
            <Button variant="outline-danger" className="rounded-0" onClick={() => removeNumber(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button variant="outline-secondary" size="sm" className="rounded-0" onClick={addNumber}>
        + Add another number
      </Button>
    </Form.Group>
  );
};

export default ContactNumbersInput;
