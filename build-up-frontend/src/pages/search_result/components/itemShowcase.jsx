import React from 'react';
import '../../../scss/search_result/search_result.scss';

function ItemShowcase({ name, price, imageUrl }) {
  return (
    <div className="item-slot">
      <div>
        <img className="item-slot__pic" src={imageUrl} alt={''} />
      </div>
      <div>
        <div className="item-slot__text">
          <p className="item-slot__text--name">{name}</p>
          <div className="item-slot__text--price">~ {price}.-</div>
        </div>
      </div>
    </div>
  );
}

export default ItemShowcase;
