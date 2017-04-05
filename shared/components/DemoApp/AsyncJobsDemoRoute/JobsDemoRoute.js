import React from 'react';
import Product from './Product';

function JobsDemoRoute() {
  return (
    <div>
      <h1>react-jobs Demo</h1>
      <p>
        This shows how you can integrate react-jobs into your project.  You
        can use this library for your data fetching needs.
      </p>
      <p>
        It interops with react-async-component allowing for nested component
        resolution and prerendering on the server.
      </p>
      <h4>Our Products:</h4>
      <Product id={1} />
      <Product id={2} />
      <Product id={3} />
    </div>
  );
}

export default JobsDemoRoute;
