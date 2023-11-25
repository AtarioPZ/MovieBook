import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const variants = {
  hidden: { scale: 1 },
  visible: { scale: 1.1 },
};

function PreNow() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullPlot, setShowFullPlot] = useState(false);

  useEffect(() => {
    const fetchPremieringNow = async () => {
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;

        // Generate random page and index values
        const randomPage = Math.floor(Math.random() * 10) + 1;

        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&page=${randomPage}&totalResults=10&plot=full`);
        const data = await response.json();

        console.log('API Response:', data);

        if (data.Search) {
          setMovies(shuffleArray(data.Search.slice(0, 5)));
        }
      } catch (error) {
        console.error('Error fetching premiering now movies:', error);
      }
    };

    fetchPremieringNow();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handlePosterClick = async (movie) => {
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`);
      const data = await response.json();
  
      console.log('Detailed Movie Information:', data);
  
      setSelectedMovie(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching detailed movie information:', error);
    }
  };

  const togglePlotDisplay = () => {
    setShowFullPlot(!showFullPlot);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalVisible(false);
    // Reset the plot display state when the modal is closed
    setShowFullPlot(false);
  };

  const modalBackground = {
    background: 'linear-gradient(45deg, #000000, #434343)',
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="content-container d-flex align-items-center">
        <p className="h1 text-black"><b>Premiering Now</b></p>
      </div>
      <div className="container mx-auto pb-3">
        <div className="row">
          {movies.map((movie, index) => (
            <div key={index} className="col-md-2 mb-3">
              <div className="position-relative" onClick={() => handlePosterClick(movie)}>
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

      {/* Modal */}
      {selectedMovie && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className={`modal fade${modalVisible ? ' show' : ''}`} tabIndex="-1" style={{ display: modalVisible ? 'block' : 'none' }} onClick={closeModal}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={modalBackground} onClick={stopPropagation}>
                <div className="modal-header">
                  <h5 className="modal-title text-light">{selectedMovie.Title} ({selectedMovie.Year})</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex">
                    {/* Poster on the left */}
                    <div>
                      <img
                        src={selectedMovie.Poster}
                        alt={`Movie ${selectedMovie.Title}`}
                        className="d-block rounded"
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                      />
                    </div>
                    {/* Plot on the right */}
                    <div className="ml-3 flex-grow-1 m-2">
                      <p className="text-light">
                        {showFullPlot ? selectedMovie.Plot : `${selectedMovie.Plot.slice(0, 150)}...`}
                        <span className="text-secondary">
                          <button className="btn btn-link p-0" onClick={togglePlotDisplay}>
                            {showFullPlot ? ' Read Less' : ' Read More'}
                          </button>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PreNow;
