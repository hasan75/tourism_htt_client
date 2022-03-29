import React from 'react';
import './Banner.css';
import bannerImg from '../../assets/images/bannerImg.png';
const Banner = () => {
  return (
    <div className='mt-2'>
      <div className='container col-lg-12 d-lg-flex py-5 banner'>
        <div className='col-lg-5 py-4 ps-2 my-auto'>
          <h1 className='mb-3'>Hit The Trail</h1>
          <h2 className='mb-3 text-primary'>A Tour Management Company</h2>
          <h3>
            “Travel is fatal to prejudice, bigotry, and narrow mindedness, and
            many of our people need it sorely on these accounts.”{' '}
            <span className='text-success'> ~ Mark Twain</span>
          </h3>
        </div>

        <div className='my-auto col-lg-6'>
          <img className='img-fluid' src={bannerImg} alt='' srcset='' />
        </div>
      </div>
    </div>
  );
};
export default Banner;
