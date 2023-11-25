import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const variants = {
  hidden: { scale: 1 },
  visible: { scale: 1.1 },
};

function PreNow() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPremieringNow = async () => {
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;

        // Generate random page and index values
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const randomIndex = Math.floor(Math.random() * 10) + 1;

        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&page=${randomPage}&totalResults=10`);
        const data = await response.json();

        console.log('API Response:', data);

        if (data.Search) {
          const shuffledMovies = shuffleArray(data.Search);
          setMovies(shuffledMovies.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching premiering now movies:', error);
      }
    };

    fetchPremieringNow();
  }, []);

  return (
    <>
      <div className="content-container d-flex align-items-center">
        <p className="h1 text-black"><b>Premiering Now</b></p>
      </div>
      <div className="container m-3">
        <div className="row">
          {movies.map((movie, index) => (
            <div key={index} className="col-md-2 mb-3">
              <div className="position-relative">
                <motion.div
                  whileHover="visible"
                  initial="hidden"
                  variants={variants}
                >
                  <img
                    src={movie.Poster}
                    alt={`Movie ${index + 1}`}
                    className="d-block w-100 rounded"
                    style={{ maxHeight: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PreNow;
