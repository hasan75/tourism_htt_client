import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import singleServiceStyle from '../assets/css/singleService.module.css';

const SingleProduct = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const discoutPrice = Math.round(
    parseInt(service?.price) -
      parseInt(service?.price) * (parseInt(service?.discount) / 100)
  );

  return (
    <div className='container my-2 py-2'>
      <h1 className='py-3 text-center text-dark'>
        Tour Package Details of{' '}
        <span className='text-warning'>{service?.title}</span>
      </h1>
      <section className=' px-5 mx-3 my-3 rounded'>
        <div className='row g-1'>
          <div className='col-lg-8'>
            <div className='pb-2'>
              <img
                src={service?.img}
                alt='sundarban_img'
                className={`${singleServiceStyle.singlePicture} img-fluid`}
              />
            </div>
          </div>
          <div className='col-lg-4'>
            <div
              className={`${singleServiceStyle.extraInfo} h-100 text-start ms-3`}
            >
              <div className={`${singleServiceStyle.extraInfoText}`}>
                <h4 className='text-secondary fw-bold text-center'>
                  Key Infos
                </h4>
              </div>
              <div className='ps-3'>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Destination:{' '}
                  <span className='fw-bold'>{service?.destination}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Journey From: <span className='fw-bold'>{service?.from}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Journey Date:{' '}
                  <span className='fw-bold'>{service?.tour_date}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Reporting Time:{' '}
                  <span className='fw-bold'>{service?.start_time}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Return Date:{' '}
                  <span className='fw-bold'>{service?.return_date}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Estimated Cost:{' '}
                  <span className='fw-bold'>{service?.price}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Discount Available:{' '}
                  <span className='fw-bold text-danger'>
                    {service?.discount} %
                  </span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary`}
                >
                  Discount Price:{' '}
                  <span className='fw-bold text-success'>{discoutPrice}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 my-4'>
            <div className={`${singleServiceStyle.tourDetails}`}>
              <h4 className='text-start text-success fw-bold'>Tour Details</h4>
              <p className='fw-bold'>{service?.desc}</p>
              <h5 className='text-warning fw-bold my-2 pt-3'>
                Read the points below before you book your package
              </h5>
              <ul class='list-group my-2 py-3'>
                <li class='list-group-item'>
                  Every Tour consists of minimum 15 people, so you have to be
                  with a group
                </li>
                <li class='list-group-item'>
                  No Extra Costs like snacks, cigarette, extra food, extra guide
                  will be beared by host.
                </li>
                <li class='list-group-item'>
                  Members have to listen to the host's call
                </li>
                <li class='list-group-item text-danger'>
                  No alcohol is allowed in the tour.
                </li>
                <li class='list-group-item'>
                  Your guide or host won't be the person which will carry your
                  belongings.
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 my-4'>
            <div className={`${singleServiceStyle.tourDetails}`}>
              <h4 className='text-start text-success fw-bold'>
                Benefits with Hit The Trail
              </h4>
              <p className='fw-bold'>
                In order to help explain the undeniable benefits of using a
                travel agent to book your future travel, I’ve partnered with
                Ataur Rahman Masum, owner of Hit The Trail.
              </p>
              <ul class='list-group my-2 py-3'>
                <li class='list-group-item'>
                  The #1 benefit of using HTT when it comes to booking your
                  family travel is because travel is our expertise.
                </li>
                <li class='list-group-item'>
                  We, the hosts of Hit The Trail have the greatest Destination
                  knowledge.
                </li>
                <li class='list-group-item'>
                  that travelers do not pay more for vacations because Hit The
                  Trail is always with you.
                </li>
                <li class='list-group-item'>
                  The relationship you’ll form with your Hit The Trail host, as
                  well as their relationships with other hosts, are two of the
                  benefits of using Hit The Trail as your travel partner.
                </li>
                <li class='list-group-item'>
                  Our Hosts will be the best assistance to you in your trip.
                  They will assist you anywhere, anyhow!! That's the main
                  advantage if you get the service of Hit The Trail
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className='my-3 text-center'>
        <Link to={`/placeorder/${id}`}>
          <button className='btn btn-outline-success'>Book Your Package</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
