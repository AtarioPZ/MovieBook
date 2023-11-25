import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link text-white">Home</Link></li>
              <li className="nav-item mb-2"><Link to="rent" className="nav-link text-white">Rent</Link></li>
            </ul>
          </div>

          <div className="col-md-6 mb-3">
            <form className="d-flex flex-column flex-sm-row gap-2">
              <div>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                <button className="btn btn-primary btn-sm" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between border-top">
          <p>© 2023 Victor. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3"><a className="link-body-emphasis text-white" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
            <li className="ms-3"><a className="link-body-emphasis text-white" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
            <li className="ms-3"><a className="link-body-emphasis text-white" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
