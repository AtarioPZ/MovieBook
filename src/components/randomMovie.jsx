import React, { useEffect, useState } from 'react';

function RandomMovie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&page=1&totalResults=100`);
        const data = await response.json();

        if (data.Search) {
          // Shuffle the movies to randomize the order
          const shuffledMovies = shuffleArray(data.Search);
          setMovies(shuffledMovies.slice(0, 3)); // Take the first 3 movies from the shuffled array
        }
      } catch (error) {
        console.error('Error fetching random movies:', error);
      }
    };

    fetchRandomMovies();
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="container m-3 shadow mx-auto">
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-inner">
          {movies.map((movie, index) => (
            <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="carousel-caption text-start">
                      <h1>{movie.Title}</h1>
                      <p className="opacity-75">{movie.Year}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      src={movie.Poster}
                      className="d-block  rounded"
                      alt={`Movie ${index + 1}`}
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default RandomMovie;
