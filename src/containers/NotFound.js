import React from 'react';
import { Link } from 'react-router';
import juvo from 'juvo';

const NotFound = () => (
  <div className="notFound">
    <div>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist. <Link to={juvo.index}>back to JUVO</Link></p>
    </div>
  </div>
);

export default NotFound;
