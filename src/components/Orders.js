import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import ReactToPdf from 'react-to-pdf';
import Swal from 'sweetalert2';
import ordersStyle from '../assets/css/orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  console.log(orders);

  useEffect(() => {
    fetch(`http://localhost:5001/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setDisplayOrders(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const handleStatusChange = (id, status) => {
    let modifiedOrders = [];
    orders.forEach((order) => {
      if (order._id === id) {
        order.status = status;
      }
      modifiedOrders.push(order);
    });
    setOrders(modifiedOrders);
    const modifiedStatus = { id, status };

    fetch('http://localhost:5001/updateOrderStatus', {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(modifiedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(<b style={{ color: '#198754' }}>Set to {status}</b>);
        } else {
          toast.error('something went wrong!');
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const deletion = (id) => {
    Swal.fire({
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
              Swal.fire('Deleted!', '', 'success');
            }
          });
      }
    });
  };
  // code for table to pdf
  const pdfRef = useRef();
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [16, 9],
  };

  //handle search
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const matchedOrders = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchText.toLowerCase()) ||
        order.email.toLowerCase().includes(searchText.toLowerCase()) ||
        order.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayOrders(matchedOrders);
  };
  // console.log(searchText.length);
  //to find the total price of the booking
  let totalPrice = displayOrders.reduce((acc, booking) => {
    return (
      acc +
      Math.round(
        parseInt(booking?.price) -
          parseInt(booking?.price) * (parseInt(booking?.discount) / 100)
      )
    );
  }, 0);

  return (
    <div className='px-2  mx-md-2 bg-white' style={{ borderRadius: '10px' }}>
      <h3 className='text-center mb-4 fw-bold my-3'>
        Manage all booking Packages
      </h3>
      {/* search container  */}
      <div className={`${ordersStyle.searchContainer} my-2`}>
        <input
          type='text'
          placeholder='enter email or name or package title to search'
          onChange={handleSearch}
        />
      </div>
      <ReactToPdf
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
      </ReactToPdf>
      {loading ? (
        <div className='text-center my-5 private-spinner py-5'>
          <Spinner variant='danger' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Table ref={pdfRef} hover borderless responsive>
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
              <th colSpan={8} className='text-center text-primary fw-bold'>
                Total Booking Price:{' '}
                <span className='text-danger'>{totalPrice}</span>
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Package</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Deletion</th>
              <th>Status</th>
            </tr>
          </thead>
          {displayOrders.map((order) => {
            return (
              <tbody key={order._id} style={{ fontWeight: '500' }}>
                <tr>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td title={order.title}>{order.title}</td>
                  <td>{order?.orderDate}</td>
                  <td>
                    {' '}
                    {Math.round(
                      parseInt(order?.price) -
                        parseInt(order?.price) *
                          (parseInt(order?.discount) / 100)
                    )}
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
                  <td>
                    <select
                      className={
                        order.status === 'Pending'
                          ? 'btn btn-danger'
                          : order.status === 'Done'
                          ? 'btn btn-success'
                          : 'btn btn-info'
                      }
                      defaultValue={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option className='bg-white text-muted'>Pending</option>
                      <option className='bg-white text-muted'>On going</option>
                      <option className='bg-white text-muted'>Done</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default Orders;
