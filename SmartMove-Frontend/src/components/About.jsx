import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div className="w-100 m-0 p-0">
      
      {/* ================= HERO BANNER HEADER SECTION ================= */}
      <div 
        className="w-100 d-flex align-items-center justify-content-center text-white text-center px-3"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/Aboutpic4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px'
        }}
      >
        <div style={{ maxWidth: '900px' }} className="py-5">
          <h1 className="fw-medium mb-4 display-4" style={{ letterSpacing: '1px' }}>
            About LuxeSkin.lk
          </h1>
          <p className="lh-lg" style={{ fontSize: '16px', color: '#f8fafc', fontWeight: '300' }}>
            Welcome to Sri Lanka’s ultimate destination for authentic, world-class beauty. At LuxeSkin.lk, we bridge the gap between global trends and your daily routine, bringing you the most requested dermatological skincare and luxury fragrances directly to your doorstep.
          </p>
        </div>
      </div>

      {/* ================= LOWER CONTENT DETAILS SECTION ================= */}
      <Container className="my-5 py-4">
        <Row className="align-items-center gy-4">
          <Col xs={12} md={6}>
            <h2 className="fw-semibold mb-3" style={{ color: '#1a2536' }}>Who We Are</h2>
            <p className="text-secondary lh-lg" style={{ fontSize: '15px' }}>
              Welcome to <strong>LuxeSkin.lk</strong>, Sri Lanka's premium destination for international 
              and 100% natural luxury beauty solutions. We believe that skincare is healthcare, and everyone 
              deserves access to safe, highly effective, and authentic cosmetics products.
            </p>
            <p className="text-secondary lh-lg" style={{ fontSize: '15px' }}>
              Our collections are handpicked and tested to ensure they deliver outstanding results while remaining 
              eco-friendly and ethically sourced directly from trusted partners.
            </p>
          </Col>
          
          <Col xs={12} md={6}>
            <Card className="border-0 p-4 rounded-0 shadow-sm text-white" style={{ backgroundColor: '#1a2536' }}>
              <Card.Body>
                <h3 className="fw-bold mb-3" style={{ color: '#c58d5e' }}>Our Mission</h3>
                <p className="lh-base" style={{ color: '#cbd5e1', fontSize: '15px' }}>
                  Our mission is to make premium, result-driven skincare and luxury scents accessible across Sri Lanka without compromise. We aim to empower your self-care journey by providing guaranteed authenticity, expert-approved formulations, and a seamless luxury shopping experience.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ================= NEW VISION & MISSION STRATIFIED SECTION ================= */}
      <div style={{ backgroundColor: '#fafafa' }} className="py-5">
        <Container className="my-4">
          <Row className="align-items-center gy-5">
            
            {/* Left Side: Strategic Text Layout */}
            <Col xs={12} lg={5}>
              <div className="pe-lg-4">
                {/* Vision Block */}
                <h2 className="fw-semibold mb-3" style={{ color: '#c58d5e' }}>What We Aim For</h2>
                <p className="text-secondary lh-lg mb-5" style={{ fontSize: '15px' }}>
                  To build an inclusive community where everyone has immediate access to the world’s best, most effective, and trending skincare solutions.
                </p>

                {/* Mission Block */}
                <h2 className="fw-semibold mb-3" style={{ color: '#c58d5e' }}>Our Guarantee to You</h2>
                <p className="text-secondary lh-lg mb-0" style={{ fontSize: '15px' }}>
                  Every single bottle of serum, cleanser, or perfume you purchase from LuxeSkin.lk is guaranteed 100% genuine. We bridge the gap between global innovations and local doorsteps with reliable, fast shipping and elite customer care.
                </p>
              </div>
            </Col>

            {/* Right Side: Showcase Images Layout */}
            <Col xs={12} lg={7}>
              <Row className="g-4 align-items-center">
                {/* Left Image (Slightly higher/centered context) */}
                <Col xs={6}>
                  <img 
                    src="/images/Aboutpic1.jpg" 
                    alt="Abhi Brand Heritage First View"
                    className="img-fluid w-100 shadow-sm"
                    style={{ borderRadius: '24px', objectFit: 'cover', height: '480px' }}
                  />
                </Col>
                
                {/* Right Image (Slightly offset downwards) */}
                <Col xs={6} className="pt-4 pt-lg-5">
                  <img 
                    src="/images/Aboutpic3.jpg" 
                    alt="Abhi Brand Heritage Second View"
                    className="img-fluid w-100 shadow-sm"
                    style={{ borderRadius: '24px', objectFit: 'cover', height: '440px' }}
                  />
                </Col>
              </Row>
            </Col>

          </Row>
        </Container>
      </div>

    </div>
  );
};

export default About;