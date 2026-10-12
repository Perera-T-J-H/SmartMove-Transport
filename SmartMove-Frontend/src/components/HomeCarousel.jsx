import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeCarousel = () => {
  return (
    <div className="w-100 m-0 p-0">
      {/* interval={3000} autoplays every 3 seconds, fade makes transitions smooth */}
      <Carousel data-bs-theme="dark" interval={3000} fade>
        
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100 object-fit-cover"
            style={{ height: '450px' }}
            src="/images/Carousels3.jpg"
            alt="First cosmetics banner"
          />
          <Carousel.Caption className="bg-white bg-opacity-75 p-4 rounded d-none d-md-block" style={{ maxWidth: '400px', margin: '0 auto 20px auto' }}>
            <h3 style={{ color: '#c58d5e' }}>Luxury Skincare</h3>
            <p className="text-dark">Discover our ultimate beauty mantra collection.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100 object-fit-cover"
            style={{ height: '450px' }}
            src="/images/Carousels4.jpg"
            alt="Second cosmetics banner"
          />
          <Carousel.Caption className="bg-white bg-opacity-75 p-4 rounded d-none d-md-block" style={{ maxWidth: '400px', margin: '0 auto 20px auto' }}>
            <h3 style={{ color: '#c58d5e' }}>Pure Glow</h3>
            <p className="text-dark">Unlock your skin's true potential with our ultra-premium</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100 object-fit-cover"
            style={{ height: '450px' }}
            src="/images/Carousels2.jpg"
            alt="Third cosmetics banner"
          />
          <Carousel.Caption className="bg-white bg-opacity-75 p-4 rounded d-none d-md-block" style={{ maxWidth: '400px', margin: '0 auto 20px auto' }}>
            <h3 style={{ color: '#c58d5e' }}>Radiant Results</h3>
            <p className="text-dark">Advanced skincare solutions engineered to restore balance</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  );
};

export default HomeCarousel;