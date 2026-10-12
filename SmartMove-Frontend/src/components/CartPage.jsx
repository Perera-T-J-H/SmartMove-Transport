import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Card, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const shippingFee = 580.00;

  // Sync state mutations directly back into global list array matrices
  const changeItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const modifiedCart = cartItems.map(item => item.id === id ? { ...item, qty: newQuantity } : item);
    setCartItems(modifiedCart);
  };

  const removeProductRecord = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Dynamic calculations based on state array values
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const total = subtotal > 0 ? subtotal + shippingFee : 0;

  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your shopping cart is currently empty.");
      return;
    }
    if (!cardData.number || !cardData.expiry || !cardData.cvv) {
      alert("Please fill in your Credit Card details.");
      return;
    }
    alert(`Processing Credit Card Payment of Rs. ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}...`);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="my-5 py-5 text-center">
        <h1 className="fw-normal mb-3" style={{ color: '#c58d5e', fontFamily: 'serif' }}>Shopping Cart</h1>
        <p className="text-secondary">Your shopping cart is currently empty.</p>
        <Button as={Link} to="/products" className="rounded-0 border-0 text-white mt-3 px-5 py-2.5" style={{ backgroundColor: '#c58d5e' }}>
          Explore Products Collection
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5 py-4">
      <h1 className="fw-normal mb-5" style={{ color: '#c58d5e', fontFamily: 'serif' }}>Shopping Cart</h1>
      
      <Row className="g-4">
        {/* Left Columns View Area */}
        <Col xs={12} lg={7}>
          <div className="table-responsive bg-white p-4 border rounded-3 shadow-sm">
            <Table className="align-middle mb-0" borderless>
              <thead>
                <tr className="text-muted border-bottom" style={{ fontSize: '14px' }}>
                  <th>Product</th>
                  <th>Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-bottom border-light-subtle">
                    <td style={{ minWidth: '220px' }}>
                      <div className="d-flex align-items-center gap-3 py-2">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="rounded-3 border object-fit-cover"
                          style={{ width: '70px', height: '70px' }}
                        />
                        <div>
                          <h6 className="mb-0 fw-medium text-dark small">{item.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td className="fw-medium text-secondary" style={{ minWidth: '110px' }}>
                      Rs.{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2 border px-2 py-1 mx-auto" style={{ maxWidth: '100px' }}>
                        <button 
                          className="btn btn-link text-decoration-none text-dark p-0 fw-bold border-0 bg-transparent"
                          onClick={() => changeItemQuantity(item.id, item.qty - 1)}
                        >
                          -
                        </button>
                        <span className="fw-semibold px-2">{item.qty}</span>
                        <button 
                          className="btn btn-link text-decoration-none text-dark p-0 fw-bold border-0 bg-transparent"
                          onClick={() => changeItemQuantity(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end fw-bold text-dark" style={{ minWidth: '110px' }}>
                      Rs.{(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-center">
                      <Button variant="link" className="text-danger p-0 border-0" onClick={() => removeProductRecord(item.id)}>
                        <i className="bi bi-x-circle-fill fs-5"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Right Columns Summary Panel */}
        <Col xs={12} lg={5}>
          <Card className="border rounded-3 shadow-sm p-3 bg-white">
            <Card.Body>
              <h5 className="text-muted fw-medium mb-4" style={{ fontSize: '15px' }}>Cart Totals</h5>
              
              <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-3">
                <span className="text-secondary">Subtotal</span>
                <span className="fw-bold text-dark">Rs.{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3 mb-3">
                <span className="text-secondary">Shipping</span>
                <span className="text-dark small text-end">Standard Shipping: <strong className="d-block mt-1">Rs.{shippingFee.toFixed(2)}</strong></span>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
                <span className="text-secondary fw-medium">Total</span>
                <span className="fw-bold text-dark fs-5" style={{ color: '#c58d5e' }}>Rs.{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <hr className="my-4" />

              <h6 className="fw-bold mb-3 text-dark">Secure Credit Card Payment</h6>
              <Form onSubmit={handlePaymentSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted mb-1">Card Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="number"
                    placeholder="xxxx xxxx xxxx xxxx" 
                    value={cardData.number}
                    onChange={handleInputChange}
                    className="rounded-0"
                    maxLength="19"
                  />
                </Form.Group>

                <Row className="g-2 mb-4">
                  <Col xs={7}>
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Expiration Date</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="expiry"
                        placeholder="MM/YY" 
                        value={cardData.expiry}
                        onChange={handleInputChange}
                        className="rounded-0"
                        maxLength="5"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={5}>
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">CVV</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="cvv"
                        placeholder="xxx" 
                        value={cardData.cvv}
                        onChange={handleInputChange}
                        className="rounded-0"
                        maxLength="3"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button 
                  type="submit"
                  className="w-100 py-3 rounded-0 border-0 text-white fw-medium text-uppercase"
                  style={{ backgroundColor: '#c58d5e', fontSize: '14px', letterSpacing: '0.5px' }}
                >
                  Pay with Credit Card
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;