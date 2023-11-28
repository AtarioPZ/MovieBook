import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [seatCount, setSeatCount] = useState(1);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat);
      } else {
        if (prevSelectedSeats.length < seatCount) {
          return [...prevSelectedSeats, seat];
        } else {
          return prevSelectedSeats;
        }
      }
    });
  };

  const handleSeatCountChange = (count) => {
    setSeatCount(count);
    setModalVisible(false);
  };

  const handleProceedToCheckout = () => {
    setCheckoutVisible(true);
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    console.log('Checkout submitted:', selectedSeats);
    setSelectedSeats([]);
    setSeatCount(1);
    setModalVisible(true);
    setCheckoutVisible(false);
  };

  const generateSeatRows = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const rowSeats = [];
      rowSeats.push(
        <td key={i} className="seat-letter">
          <b>{String.fromCharCode(65 + i)}</b>
        </td>
      );
      for (let j = 1; j <= 5; j++) {
        const seat = `${String.fromCharCode(65 + i)}${j}`;
        const isSelected = selectedSeats.includes(seat);
        rowSeats.push(
          <td
            key={`${i}-${j}`}
            className={`seat ${isSelected ? 'bg-success' : ''}`}
            onClick={() => handleSeatClick(seat)}
            style={{ cursor: 'pointer' }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#90EE90')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '')}
          >
            {j}
          </td>
        );
      }
      rows.push(<tr key={i}>{rowSeats}</tr>);
    }
    return rows;
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card shadow text-center seat-booking-card">
          <div className="card-body">
            <h2 className="card-title">Select Your Seats</h2>
            {modalVisible && (
              <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                <div className="modal-dialog" style={{ margin: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
                  <div className="modal-content" style={{ background: 'linear-gradient(45deg, #000000, #434343)', color: '#fff' }}>
                    <div className="modal-header">
                      <h5 className="modal-title">Select Number of Seats</h5>
                    </div>
                    <div className="modal-body">
                      <p>How many seats would you like to book?</p>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-primary me-2" onClick={() => handleSeatCountChange(1)}>
                          1
                        </button>
                        <button className="btn btn-primary me-2" onClick={() => handleSeatCountChange(2)}>
                          2
                        </button>
                        <button className="btn btn-primary" onClick={() => handleSeatCountChange(3)}>
                          3
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="seat-grid">
              <table className="table table-bordered seat-table">
                <tbody>{generateSeatRows()}</tbody>
              </table>
            </div>
            {selectedSeats.length > 0 && (
              <div className="selected-seats">
                <p>Selected Seats: {selectedSeats.join(', ')}</p>
                <button className="btn btn-success" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Drawer */}
      {checkoutVisible && (
        <div className="drawer" style={{ background: '#fff', color: '#000', width: '300px', height: '100%', position: 'fixed', top: 0, right: 0, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', padding: '20px' }}>
          <h3>Checkout</h3>
          <p>Total Price: Rs 140</p>
          <form onSubmit={handleCheckoutSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Book() {
  const { title, year } = useParams();

  return (
    <>
      <div className="container mt-4">
        <div className="card shadow text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="card-body">
            <h2 className="card-title">
              {title} <span style={{ fontSize: '1.6rem', fontWeight: 'normal' }}>[{year}]</span>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <SeatBooking />
      </div>
    </>
  );
}

export default Book;
