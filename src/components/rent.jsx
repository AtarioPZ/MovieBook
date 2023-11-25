import React from 'react';
import { motion } from 'framer-motion';

const Rent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="container m-3 text-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-4">No Movies Available for Rent</h2>
      <div className="text-center">
        <img
          src="https://i.pinimg.com/originals/3e/90/e8/3e90e8bfe2328d42174d3c3743977cdf.png"
          alt="Empty Movie Reel"
          className="img-fluid mb-3"
          style={{ maxWidth: '200px' }}
        />
      </div>
      <p className="text-center">
        We apologize, but currently, there are no movies available for rent. Please check back
        later.
      </p>
    </motion.div>
  );
};

export default Rent;
