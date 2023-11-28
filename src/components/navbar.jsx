import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NavBar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: '0%' },
  };

  const handleButtonClick = () => {
    // Show the modal
    setModalOpen(true);
  };

  const closeModal = () => {
    // Close the modal
    setModalOpen(false);
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src='https://i.ibb.co/hsZC3P7/logo.png' alt="mdo" width="32" height="32" className="rounded-circle"/>
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link to="/" className="nav-link px-2 text-secondary">Home</Link>
              </motion.div>
            </li>
            <li>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link to="/rent" className="nav-link px-2 text-secondary">Rent</Link>
              </motion.div>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              type="button"
              className="btn btn-outline-light me-2"
              onClick={handleButtonClick}
            >
              Login
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              type="button"
              className="btn btn-warning"
              onClick={handleButtonClick}
            >
              Sign-up
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog" style={{ margin: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
            <motion.div
              className="modal-content"
              initial="hidden"
              animate="visible"
              variants={modalVariants}
              style={{ backgroundColor: '#343a40', color: '#ffffff' }} // Set background and text color
            >
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-circle-fill me-2"></i> Oops!
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>                  
                  It seems you've wandered into the unknown. The path you seek is hidden, lost in the vastness of the digital realm.
                </p>
                <p>
                  But fret not! Click the close button to return to familiar territory.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  <i className="bi bi-x-lg me-2"></i> Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
