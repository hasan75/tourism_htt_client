import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CheckoutForm = ({ order }) => {
  const { price } = order;
  const [errormsg, setErrormsg] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch('http://localhost:5001/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      //   console.log(error.message);
      setErrormsg(error.message);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errormsg,
        html: 'Please, try again',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setErrormsg('');
      console.log('[PaymentMethod]', paymentMethod);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          type='submit'
          className='btn btn-outline-success'
          disabled={!stripe}
        >
          Pay {parseInt(price)} Taka
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
