import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import singleServiceStyle from '../assets/css/singleService.module.css';

const SingleProduct = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);
  return (
    <div className='container my-2 py-2'>
      <h1 className='py-3 text-center text-dark'>
        Tour Package Details of{' '}
        <span className='text-warning'>{service?.title}</span>
      </h1>
      <section className=' tourDetails px-5 mx-3 my-3 bg-light rounded'>
        <div className='row g-2'>
          <div className='col-mlg-6'>
            <div className='pb-2 mb-4'>
              <img
                src={service?.img}
                alt='sundarban_img'
                className={`${singleServiceStyle.singlePicture} img-fluid`}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 m-2'>
            <h4 className='text-center text-success fw-bold'>Tour Details</h4>
            <p className='fw-bold'>{service?.desc}</p>
          </div>
          <div className='col-md-6 m-2'>
            <h4 className='text-secondary fw-bold'>Extra Informations</h4>
            <div className='text-center'>
              <h6 className='text-secondary'>Cost: {service?.price}.00 TK</h6>
              <h6 className='text-secondary'>
                Journey Start From: {service?.from}
              </h6>
              <h6 className='text-secondary'>
                Destination: {service?.destination}
              </h6>
              <h6 className='text-secondary'>
                Package Rating: {service?.rating}
              </h6>
              <h6 className='text-secondary'>
                Package Rated By: {service?.totalReview} persons
              </h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
