import React from 'react';
import '../../../scss/homepage/homepage.scss';

function ItemShowcase({ name, price, imageUrl, isAvgPrice = true }) {
  return (
    <div className="item-slot">
      <div>
        <img className="item-slot__pic" src={imageUrl} alt={''} />
      </div>
      <div>
        <div className="item-slot__text">
          <p className="item-slot__text--name">{name}</p>
          <div className="item-slot__text--price">
            {isAvgPrice ? '~' : ''} {price}.-
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemShowcase;
