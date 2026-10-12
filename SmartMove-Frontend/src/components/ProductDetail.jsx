import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { getProductById } from '../api/productApi';

const ProductDetail = ({ cartItems, setCartItems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then(setCurrentProduct)
      .catch(err => console.error('Failed to load product:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Container className="text-center my-5 py-5"><p>Loading...</p></Container>;
  }

  if (!currentProduct) {
    return (
      <Container className="text-center my-5 py-5">
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
      </Container>
    );
  }

  const handleDecrease = () => quantity > 1 && setQuantity(prev => prev - 1);
  const handleIncrease = () => setQuantity(prev => prev + 1);

  const handleAddToCart = () => {
    const existingIndex = cartItems.findIndex(item => item.id === currentProduct.id);
    if (existingIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingIndex].qty += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        img: currentProduct.img,
        qty: quantity
      }]);
    }
    navigate('/cart');
  };

  const handleBuyNow = () => {
    setCartItems([{
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      img: currentProduct.img,
      qty: quantity
    }]);
    navigate('/checkout', {
      state: { product: currentProduct, selectedQuantity: quantity }
    });
  };

  return (
    <Container className="my-5 py-5">
      <Row className="gy-5 gx-md-5 align-items-center">
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
          <div 
            className="border bg-white d-flex align-items-center justify-content-center p-3 shadow-sm w-100" 
            style={{ maxHeight: '400px', maxWidth: '400px', aspectRatio: '1 / 1', overflow: 'hidden' }}
          >
            <img 
              src={currentProduct.img} 
              alt={currentProduct.name} 
              className="img-fluid object-fit-contain"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        </Col>

        <Col xs={12} md={6}>
          <span className="text-uppercase text-muted small tracking-wide mb-1 d-block">Premium Skincare</span>
          <h1 className="fw-semibold text-dark mb-2" style={{ fontSize: '32px' }}>{currentProduct.name}</h1>
          <h3 className="fw-bold mb-4" style={{ color: '#c58d5e' }}>Rs. {currentProduct.price.toFixed(2)}</h3>
          <hr className="my-4" />
          <div className="mb-4">
            <Form.Label className="text-muted fw-medium mb-2" style={{ fontSize: '14px' }}>Quantity</Form.Label>
            <InputGroup style={{ maxWidth: '140px' }} className="shadow-sm">
              <Button variant="outline-secondary" className="rounded-0 px-3 bg-white text-dark border-secondary-subtle" onClick={handleDecrease}>-</Button>
              <Form.Control className="text-center bg-white border-y border-secondary-subtle rounded-0 fw-semibold text-dark" readOnly value={quantity} />
              <Button variant="outline-secondary" className="rounded-0 px-3 bg-white text-dark border-secondary-subtle" onClick={handleIncrease}>+</Button>
            </InputGroup>
          </div>
          <div className="d-flex flex-column gap-3" style={{ maxWidth: '350px' }}>
            <div className="d-flex gap-2 w-100">
              <Button 
                className="rounded-0 py-3 fw-semibold border-0 text-white w-50"
                style={{ backgroundColor: '#1a2536', fontSize: '13px', letterSpacing: '0.5px' }}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
              <Button 
                className="rounded-0 py-3 fw-semibold border-0 text-white w-50"
                style={{ backgroundColor: '#c58d5e', fontSize: '13px', letterSpacing: '0.5px' }}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
            <Link to="/products" className="text-muted small text-decoration-none mt-2 d-inline-block">
              ← Return to all collections
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;