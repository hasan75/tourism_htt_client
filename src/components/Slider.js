import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../assets/css/slider.css';
import Slider1 from '../assets/images/slider1.png';
import Slider2 from '../assets/images/slider2.png';
import Slider3 from '../assets/images/slider3.png';
import Slider4 from '../assets/images/slider4.png';

const Slider = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={Slider1} alt='Slider Img' />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Cox's Bazar Sea Beach</h3>
            <p>
              Hit the Trail often arrange tours in cox's bazar. It is basically
              a relax package where people of any ages can go. The packages of
              ours are not negotiable. We prefer wuality services to everyone.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={Slider2} alt='Second slide' />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Places Hidden in Bangladesh</h3>
            <p>
              Hit the Trail often arrange tours all over the Bangladesh. It is
              basically a relax package where people of any ages can go. The
              packages of ours are not negotiable. We prefer wuality services to
              everyone.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={Slider3} alt='Third slide' />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Saint Martin Iseland</h3>
            <p>
              Hit the Trail often arrange tours in Saint Martin. It is basically
              a relax package where people of any ages can go. The packages of
              ours are not negotiable. We prefer wuality services to everyone.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={Slider4} alt='Fourth slide' />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Ratargul Swam Forest, Sylhet</h3>
            <p>
              Hit the Trail often arrange tours in sylhet. It is basically a
              relax package where people of any ages can go. The packages of
              ours are not negotiable. We prefer quality services to everyone.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
