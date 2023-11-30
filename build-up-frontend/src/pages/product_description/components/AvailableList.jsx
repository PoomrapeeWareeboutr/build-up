import '../../../scss/product_description/available_list.scss';
import React from 'react';

export const AvailableList = () => {
  return (
    <div className={'product-list'}>
      {Array.from(Array(3), (e, i) => {
        return (
          <div key={i} className={'product-list__item'}>
            <div className={'product-list__choice-text'}>
              #{i + 1} Choice{' '}
              <span className={'product-list__choice-text--cheapest'}>
                (Cheapest🔥)
              </span>
            </div>
            <div className={'product-list__info'}>
              <div className={'product-list__price'}>3,900.-</div>
              <div className={'product-list__button'}>
                <div>Add to cart</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
