import React from 'react'
import { useParams } from 'react-router-dom';

function Book() {
  const { title, year } = useParams();

  return (
    <>
      <div className='container m-3'>
        <h1>Movie Booking</h1>
        <p>Movie: {title}</p>
        <p>Year: {year}</p>
      </div>
    </>
  );
}

export default Book;