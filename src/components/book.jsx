import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    // Toggle seat selection
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  // Function to generate seat rows dynamically
  const generateSeatRows = () => {
    const rows = [];
    let seatNumber = 1;
    for (let i = 0; i < 5; i++) {
      const rowSeats = [];
      rowSeats.push(
        <td key={i} className="seat-letter">
          {String.fromCharCode(65 + i)}
        </td>
      );
      for (let j = 1; j <= 5; j++) {
        const seat = `${String.fromCharCode(65 + i)}${j}`;
        const isSelected = selectedSeats.includes(seat);
        rowSeats.push(
          <td
            key={`${i}-${j}`}
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seat)}
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
            <div className="seat-grid">
              <table className="table table-bordered seat-table">
                <tbody>{generateSeatRows()}</tbody>
              </table>
            </div>
            {selectedSeats.length > 0 && (
              <div className="selected-seats">
                <p>Selected Seats: {selectedSeats.join(', ')}</p>
                <button className="btn btn-success">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      </div>
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
      <SeatBooking />
    </>
  );
}

export default Book;
