import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/orderApi';

const CheckoutPage = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read data routed directly from Buy Now configuration click triggers
  const routedProduct = location.state?.product;
  const initialQuantity = location.state?.selectedQuantity || 1;

  // Fallback default state if page was refreshed directly
  const product = routedProduct || {
    id: 2,
    name: 'Natural Lip Balm',
    price: 950.00,
    img: '/images/Product2.jpg' // Made fallback path local match your public directory setup
  };

  const shippingFee = 580.00;
  const subtotal = product.price * initialQuantity;
  const total = subtotal + shippingFee;

  // Form Fields State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '', 
    address: '',
    phone: '',
    zipCode: '',
    paymentMethod: 'card' 
  });

  // Validation State Flag
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handlePlaceOrder = async (event) => {
  const form = event.currentTarget;
  event.preventDefault();

  if (form.checkValidity() === false) {
    event.stopPropagation();
    setValidated(true);
    return;
  }
  setValidated(true);

  try {
    await placeOrder({
      userId: currentUser.id,
      productId: product.id,
      quantity: initialQuantity,
      address: `${formData.address}, ${formData.country}, ${formData.zipCode}`,
      phone: formData.phone
    });

    alert(`Order Placed Successfully!\n\nName: ${formData.firstName} ${formData.lastName}\nCountry: ${formData.country}\nTotal: Rs. ${total.toFixed(2)}`);
    navigate('/products');
  } catch (err) {
    alert('Failed to place order: ' + err.message);
  }
};

  return (
    <Container className="my-5 py-4">
      <h1 className="fw-normal mb-5" style={{ color: '#c58d5e', fontFamily: 'serif' }}>Checkout</h1>
      
      <Form noValidate validated={validated} onSubmit={handlePlaceOrder}>
        <Row className="g-5">
          
          {/* Left Column: Customer Form Details */}
          <Col xs={12} lg={7}>
            <h4 className="mb-4 text-dark fw-medium">Billing Details</h4>
            
            <Row className="g-3">
              <Form.Group as={Col} xs={12} sm={6} controlId="formFirstName">
                <Form.Label className="text-muted small fw-medium">First Name *</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="rounded-0 border-secondary-subtle py-2 shadow-none"
                />
                <Form.Control.Feedback type="invalid">First name is required.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} sm={6} controlId="formLastName">
                <Form.Label className="text-muted small fw-medium">Last Name *</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="rounded-0 border-secondary-subtle py-2 shadow-none"
                />
                <Form.Control.Feedback type="invalid">Last name is required.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formCountry">
                <Form.Label className="text-muted small fw-medium">Country / Region *</Form.Label>
                <Form.Select 
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="rounded-0 border-secondary-subtle py-2 shadow-none"
                >
                  <option value="" disabled>-- Select your country --</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                  <option value="Maldives">Maldives</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select your country from the menu.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formAddress">
                <Form.Label className="text-muted small fw-medium">Street Address *</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  name="address"
                  placeholder="House number and street name"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="rounded-0 border-secondary-subtle py-2 shadow-none"
                />
                <Form.Control.Feedback type="invalid">Please provide your complete shipping address.</Form.Control.Feedback>
              </Form.Group>

               <Form.Group as={Col} xs={12} sm={6} controlId="formPhone">
                 <Form.Label className="text-muted small fw-medium">Phone Number *</Form.Label>
                 <Form.Control 
                     required
                     type="text"
                     name="phone"
                     placeholder="e.g. 0771234567"
                     value={formData.phone}
                     onChange={handleInputChange}
                     maxLength="10"
                     pattern="^0\d{9}$" // Enforces exactly 10 digits starting with a 0
                     className="rounded-0 border-secondary-subtle py-2 shadow-none"
                  />
                  <Form.Control.Feedback type="invalid">
                  Please enter a valid 10-digit phone number starting with 0.
                  </Form.Control.Feedback>
               </Form.Group>

              <Form.Group as={Col} xs={12} sm={6} controlId="formZip">
                <Form.Label className="text-muted small fw-medium">Postcode / ZIP *</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="rounded-0 border-secondary-subtle py-2 shadow-none"
                />
                <Form.Control.Feedback type="invalid">ZIP or Postal Code is required.</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <h4 className="mt-5 mb-4 text-dark fw-medium">Payment Method</h4>
            <Card className="rounded-0 border-secondary-subtle bg-light-subtle p-4">
              <Form.Check 
                type="radio"
                id="cardPayment"
                label="Credit / Debit Card (Visa, Mastercard, AMEX)"
                name="paymentMethod"
                value="card"
                checked={true}
                readOnly
                className="fw-semibold text-dark mb-2"
              />
              <div className="ps-4 text-muted small">
                Your payment will be handled securely through an encrypted SSL gateway interface. We accept all local and international bank cards.
              </div>
            </Card>
          </Col>

          {/* Right Column: Order Summary Side-Panel */}
          <Col xs={12} lg={5}>
            <Card className="border rounded-0 p-3 bg-white shadow-sm position-sticky" style={{ top: '20px' }}>
              <Card.Body>
                <h5 className="text-dark fw-semibold mb-4" style={{ fontSize: '16px', letterSpacing: '0.5px' }}>Your Order</h5>
                
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3 bg-transparent">
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                        className="border"
                      />
                      <div>
                        <h6 className="mb-0 small fw-medium text-dark">{product.name}</h6>
                        <span className="text-muted small">Qty: {initialQuantity}</span>
                      </div>
                    </div>
                    <span className="small fw-semibold text-dark">Rs. {subtotal.toFixed(2)}</span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between px-0 py-3 bg-transparent text-secondary small">
                    <span>Subtotal</span>
                    <span className="fw-medium text-dark">Rs. {subtotal.toFixed(2)}</span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between px-0 py-3 bg-transparent text-secondary small">
                    <span>Shipping</span>
                    <span className="fw-medium text-dark">Rs. {shippingFee.toFixed(2)}</span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between px-0 py-3 bg-transparent border-bottom-0">
                    <span className="fw-semibold text-dark">Total</span>
                    <span className="fw-bold fs-5" style={{ color: '#c58d5e' }}>Rs. {total.toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>

                <Button 
                  type="submit"
                  className="w-100 py-3 rounded-0 border-0 text-white fw-semibold text-uppercase"
                  style={{ backgroundColor: '#c58d5e', fontSize: '14px', letterSpacing: '1px' }}
                >
                  Proceed to Pay
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Form>
    </Container>
  );
};

export default CheckoutPage;