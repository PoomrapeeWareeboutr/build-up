import ItemShowcase from './ItemShowcase';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const ItemShowcaseList = ({ items }) => {
  const navigate = useNavigate();
  function navigateToProductDescription(productName) {
    navigate(`/product/${productName}/description`);
  }
  return (
    <div className={'item-showcase-list'}>
      {items.map((item, i) => (
        <div key={i} onClick={() => navigateToProductDescription(item.name)}>
          <ItemShowcase
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};
