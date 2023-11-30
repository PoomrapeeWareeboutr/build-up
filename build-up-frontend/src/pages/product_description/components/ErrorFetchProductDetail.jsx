import React from 'react';
import '../../../scss/product_description/product_description.scss';
import { Link } from 'react-router-dom';

export const ErrorFetchProductDetail = () => {
  return (
    <div className={'col loading'}>
      <div>
        <div>Something went wrong :(</div>
        <Link to={'/'}>go back home...</Link>
      </div>
    </div>
  );
};
