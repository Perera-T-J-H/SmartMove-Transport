import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PromoSection = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="px-0 my-5">
      
      {/* ================= TOP SECTION ROW ================= */}
      <Row className="g-0 mb-4"> {/* 💡 mb-4 pushes the bottom row downwards smoothly */}
        
        {/* Top Left Banner */}
        <Col xs={12} md={6} 
          className="position-relative d-flex align-items-center justify-content-center text-white text-center px-4 py-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h2 className="fw-bold mb-3 fs-1" style={{ color: '#f3d9b1' }}>
              The Botanical Elixir
            </h2>
            <p className="lh-lg" style={{ fontSize: '15px', color: '#eaeaea' }}>
              Indulge in a premium skincare collection crafted from 100% natural ingredients. Scientifically formulated to nourish your skin and restore your natural, radiant glow.
            </p>
          </div>
        </Col>

        {/* Top Right Banner */}
        <Col xs={12} md={6} 
          className="position-relative d-flex align-items-center justify-content-center text-white text-center px-4 py-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h2 className="fw-bold mb-3 fs-1" style={{ color: '#f3d9b1' }}>
              Conscious Skin Therapy
            </h2>
            <p className="lh-lg" style={{ fontSize: '15px', color: '#eaeaea' }}>
              Experience sustainable luxury at our premier skin clinic. We pair eco-friendly wellness with ethically sourced, fair-trade botanicals that honor both your skin and our planet.
              </p>
          </div>
        </Col>
      </Row>

      {/* ================= BOTTOM SECTION ROW ================= */}
      <Row className="g-0">
        
        {/* Bottom Left Banner */}
        <Col xs={12} md={6} 
          className="position-relative d-flex align-items-center justify-content-center text-white text-center px-4 py-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h2 className="fw-bold mb-3 fs-1" style={{ color: '#f3d9b1' }}>
              Pure Radiance
            </h2>
            <p className="lh-lg" style={{ fontSize: '15px', color: '#eaeaea' }}>
              For the cosmetic lovers Abhi is able to provide the best quality cosmetics produced with 100 percent natural ingredients. The compelling nature of these range of products are made with the concept of eco-friendly as they are solely formulated only with the finest natural ingredients while adhering to fair trade practices so that the farmers, who cultivate herbs too can be benefited as key participants.Elevate your daily beauty ritual with luxury cosmetics derived entirely from nature. Clean, powerful, and unconditionally gentle on your skin.
            </p>
          </div>
        </Col>

        {/* Bottom Right Banner */}
        <Col xs={12} md={6} 
          className="position-relative d-flex align-items-center justify-content-center text-white text-center px-4 py-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h2 className="fw-bold mb-3 fs-1" style={{ color: '#f3d9b1' }}>
              Holistic Dermatology
            </h2>
            <p className="lh-lg" style={{ fontSize: '15px', color: '#eaeaea' }}>
              Where clinical expertise meets ethical sourcing. We design customized, eco-conscious treatment plans utilizing premium herbs grown by local, fair-trade farmers.
            </p>
          </div>
        </Col>
      </Row>

      {/* View Products Button */}
      <div className="text-center mt-5 mb-2">
        <Button 
          onClick={() => navigate('/products')}
          className="px-5 py-3 fs-5 fw-semibold border-0 rounded-0 shadow-sm"
          style={{ 
            backgroundColor: '#c58d5e', 
            letterSpacing: '1px',
            transition: 'all 0.3s' 
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#b0794c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#c58d5e'}
        >
          View Products
        </Button>
      </div>
    </Container>
  );
};

export default PromoSection;