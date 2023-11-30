import React from 'react';
export const ReturnCategory = (props) => {
  const categories = ['shoes', 't-shirt'];
  return (
    <ul className="dropdown-menu">
      {categories.map((category, index) => (
        <li key={index} onClick={() => props.handleCategory(category)}>
          <div className="dropdown-item col">{category}</div>
        </li>
      ))}
    </ul>
  );
};
