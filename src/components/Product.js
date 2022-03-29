import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import productStyle from '../assets/css/product.module.css';

const Product = ({ product }) => {
  const {
    _id,
    title,
    desc,
    price,
    img,
    rating,
    totalReview,
    from,
    destination,
    tour_date,
    start_time,
    return_date,
    discount,
  } = product;
  const priceAfterDiscount = parseInt(price);
  console.log(priceAfterDiscount);
  return (
    <Col className='my-3 text-center' sm={12} md={6} lg={4}>
      <Zoom>
        <Card
          style={{ height: '32em', width: '22rem' }}
          className='mx-1  shadow'
        >
          <div className='text-center'>
            <Card.Img
              style={{ width: '100%', height: '12rem' }}
              variant='top'
              src={img}
            />
          </div>
          <Card.Body className={productStyle.cardBody}>
            <div className={productStyle.discountContainer}>
              <h6 className={productStyle.discountText}>
                {discount}% Discount
              </h6>
            </div>
            <Card.Title className='text-uppercase text-center'>
              {title}
            </Card.Title>
            <Card.Text className='text-center small'>
              <i className='fas event-icon fa-map-marker-alt text-success'></i>{' '}
              &nbsp; {from} to {destination} &nbsp;{' '}
              <i className='fas event-icon fa-flag-checkered text-success'></i>
            </Card.Text>
            <Card.Text className='text-center fw-bold '>
              Budget:{' '}
              <span className='text-decoration-line-through textDecorationColor'>
                {' '}
                {price}.00
              </span>
              <span className='text-success'>
                {' '}
                {parseInt(price) -
                  parseInt(price) * (parseInt(discount) / 100)}{' '}
              </span>
              TK
            </Card.Text>
            <hr />
            <Card.Text>{desc.slice(0, 110)}...</Card.Text>
            <Card.Text className='text-center'>
              Rating:{' '}
              <Rating
                className='text-danger text-center mt-2'
                initialRating={rating}
                readonly
                emptySymbol='far fa-star'
                fullSymbol='fas fa-star'
              />{' '}
              {rating} ({totalReview})
            </Card.Text>
            <Link to={`products/${_id}`}>
              <button className='btn mt-2 btn-primary me-5'>See Details</button>
            </Link>
            <Link to={`/placeorder/${_id}`}>
              <button className='btn mt-2 btn-primary'>Buy Now</button>
            </Link>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default Product;
