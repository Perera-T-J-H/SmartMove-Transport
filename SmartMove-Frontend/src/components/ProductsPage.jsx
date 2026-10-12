import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../api/productApi';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <div className="w-100 m-0 p-0">
      <div 
        className="w-100 d-flex align-items-center justify-content-center text-white text-center px-3"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '320px'
        }}
      >
        <div>
          <h1 className="fw-semibold display-4 mb-2">Our Collections</h1>
          <p className="lead" style={{ color: '#f1f5f9', fontWeight: '300' }}>Explore tailored luxury solutions optimized for your health</p>
        </div>
      </div>

      <Container className="my-5 py-3">
        <Row className="g-4">
          {products.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card 
                className="h-100 border-0 shadow-sm rounded-0 text-center" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div style={{ overflow: 'hidden', height: '260px' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.img} 
                    className="w-100 h-100 object-fit-cover rounded-0"
                    style={{ transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
                  />
                </div>
                <Card.Body className="d-flex flex-column align-items-center justify-content-between">
                  <Card.Title className="fs-5 fw-normal mb-2 text-dark">{product.name}</Card.Title>
                  <Card.Text className="fw-bold mb-3 text-secondary">
                    Rs. {product.price.toFixed(2)}
                  </Card.Text>
                  <Button 
                    variant="dark" 
                    className="w-100 rounded-0 text-uppercase fw-semibold border-0 py-2"
                    style={{ backgroundColor: '#1a2536', fontSize: '13px', letterSpacing: '0.5px' }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductsPage;