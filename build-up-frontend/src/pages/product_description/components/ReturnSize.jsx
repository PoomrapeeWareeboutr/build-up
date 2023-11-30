import React from 'react';
import '../../../scss/product_description/product_detail.scss';
export const ReturnSize = (props) => {
  const sizes = [
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
  ];
  return (
    <ul className="dropdown-menu">
      {sizes.map((size, index) => (
        <li key={index} onClick={() => props.handleSize(size)}>
          <div className="dropdown-item col">{size}</div>
        </li>
      ))}
    </ul>
  );
};
