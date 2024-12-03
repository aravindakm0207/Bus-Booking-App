import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SeatSelection.css';

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/seats')
      .then(response => {
        console.log('Fetched seats:', response.data); // Log the fetched data
        setSeats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the seats!', error);
      });
  }, []);

  const bookSeat = (seatNumber) => {
    axios.post('http://localhost:5000/api/seats/book', { seatNumber })
      .then(response => {
        console.log('Booked seat:', response.data); // Log the booked seat
        const updatedSeats = seats.map(seat =>
          seat.seatNumber === seatNumber ? { ...seat, isBooked: true } : seat
        );
        setSeats(updatedSeats);
      })
      .catch(error => {
        console.error('There was an error booking the seat!', error);
      });
  };

  return (
    <div className="seat-selection">
      {seats.length === 0 ? (
        <p>Loading seats...</p>
      ) : (
        seats.map(seat => (
          <div
            key={seat.seatNumber}
            className={`seat ${seat.isBooked ? 'booked' : ''}`}
            onClick={() => !seat.isBooked && bookSeat(seat.seatNumber)}
          >
            {seat.seatNumber}
          </div>
        ))
      )}
    </div>
  );
};

export default SeatSelection;
