import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useContexts from '../hooks/useContexts.js';
import myordersStyle from '../assets/css/myorder.module.css';
import ReactToPdf from 'react-to-pdf';
import ReactToPrint from 'react-to-print';

const Orders = () => {
  const { email } = useContexts();
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // for printing pdf
  const componentRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setDisplayOrders(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, [email]);

  const deletion = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to delete this order?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5001/placeorder/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const modifiedOrders = orders.filter((order) => order._id !== id);
              setOrders(modifiedOrders);
              setDisplayOrders(modifiedOrders);
              Swal.fire('Deleted!', '', 'success');
            }
          });
      }
    });
  };

  //handle search
  const handleMyOrderSearch = (e) => {
    const searchText = e.target.value;
    const matchedOrders = orders.filter(
      (order) =>
        order.title.toLowerCase().includes(searchText.toLowerCase()) ||
        order.desc.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayOrders(matchedOrders);
  };

  // useRef for pdf
  // const pdfRef = useRef();
  // const options = {
  //   orientation: 'landscape',
  //   unit: 'in',
  //   format: [12, 12],
  // };

  // const handleChangeDate = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <div className='px-2  mx-md-2 bg-white' style={{ borderRadius: '15px' }}>
      <h3 className='text-center fw-bold mb-4'>My Booked Packages</h3>

      {/* search container  */}
      <div className={`${myordersStyle.searchContainer} my-2`}>
        <input
          type='text'
          placeholder='enter package name or description or package title to search'
          onChange={handleMyOrderSearch}
        />
      </div>

      {/* <input type='date' onChange={handleChangeDate} /> */}
      {/* <ReactToPdf
        targetRef={pdfRef}
        filename='htt.pdf'
        options={options}
        x={0.5}
        y={0.5}
        // scale={0.8}
      >
        {({ toPdf }) => (
          <button className='btn btn-warning mb-3' onClick={toPdf}>
            <i className='fa-solid fa-print'></i>
          </button>
        )}
      </ReactToPdf> */}
      {/* <button className='btn btn-warning mb-3' onClick={handlePrint}>
        <i className='fa-solid fa-print'></i>
      </button> */}

      {/* print trigger button  */}
      <ReactToPrint
        trigger={() => (
          <button className='btn btn-warning mb-3'>
            {' '}
            <i className='fa-solid fa-print'></i>
          </button>
        )}
        content={() => componentRef.current}
      />
      {loading ? (
        <div className='text-center my-5 private-spinner py-5'>
          <Spinner variant='danger' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <>
          <Table hover borderless responsive>
            <Toaster position='bottom-left' reverseOrder={false} />
            <thead className='bg-light'>
              <tr>
                <th colSpan={8} className='text-center text-primary fw-bold'>
                  <span className='text-danger'> Hit The Trail </span> <br />
                  The package list booked at Hit The Trail <br />
                  <span className='text-secondary'>
                    Date: {new Date().toDateString()}
                  </span>
                </th>
              </tr>
              <tr>
                <th>Image</th>
                <th>Package</th>
                <th>Description</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Deletion</th>
              </tr>
            </thead>
            {displayOrders.map((order) => {
              return (
                <tbody key={order._id} style={{ fontWeight: '500' }}>
                  <tr>
                    <td>
                      <img width='100px' src={order.img} alt='' />
                    </td>
                    <td>{order.title}</td>
                    <td>{order.desc}</td>
                    <td>{order?.orderDate}</td>

                    <td>
                      <button
                        style={{ width: '100px' }}
                        className={
                          order.status === 'Pending'
                            ? 'btn btn-danger'
                            : order.status === 'Done'
                            ? 'btn btn-success'
                            : 'btn btn-info'
                        }
                      >
                        {order.status}
                      </button>
                    </td>
                    <td>
                      <Button
                        variant='outline-danger'
                        className='p-1 ml-3 mb-0'
                        onClick={() => deletion(order._id)}
                      >
                        <i className='fas mx-1 fa-trash'></i>
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <div style={{ display: 'none' }}>
            <Table ref={componentRef} hover borderless responsive>
              <Toaster position='bottom-left' reverseOrder={false} />
              <thead className='bg-light'>
                <tr>
                  <th colSpan={8} className='text-center text-primary fw-bold'>
                    <span className='text-danger'> Hit The Trail </span> <br />
                    The package list booked at Hit The Trail <br />
                    <span className='text-secondary'>
                      Date: {new Date().toDateString()}
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>Image</th>
                  <th>Package</th>
                  <th>Description</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              {displayOrders.map((order) => {
                return (
                  <tbody key={order._id} style={{ fontWeight: '500' }}>
                    <tr>
                      <td>
                        <img width='100px' src={order.img} alt='' />
                      </td>
                      <td>{order.title}</td>
                      <td>{order.desc}</td>
                      <td>{order?.orderDate}</td>

                      <td>
                        <button
                          style={{ width: '100px' }}
                          className={
                            order.status === 'Pending'
                              ? 'btn btn-danger'
                              : order.status === 'Done'
                              ? 'btn btn-success'
                              : 'btn btn-info'
                          }
                        >
                          {order.status}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
