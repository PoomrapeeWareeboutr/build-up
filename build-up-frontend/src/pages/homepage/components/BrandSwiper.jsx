import React from 'react';
import '../../../scss/homepage/homepage.scss';
import BrandIcon from './BrandIcon';

function BrandSwiper() {
  const brands = [
    {
      name: 'Nike',
      logoUrl: require('../../../images/brands/nike.png'),
    },
    {
      name: 'Adidas',
      logoUrl: require('../../../images/brands/adidas.png'),
    },
    {
      name: 'New Balance',
      logoUrl: require('../../../images/brands/new_balance.png'),
    },
    {
      name: 'Gucci',
      logoUrl: require('../../../images/brands/gucci.png'),
    },
    {
      name: 'Chanel',
      logoUrl: require('../../../images/brands/chanel.png'),
    },
    {
      name: 'Celine',
      logoUrl: require('../../../images/brands/celine.png'),
    },
  ];

  return (
    <div className="swiper-container">
      <div className="swiper-container__brand">
        {brands.map((brand, index) => (
          <BrandIcon key={index} name={brand.name} logoUrl={brand.logoUrl} />
        ))}
      </div>
    </div>
  );
}

export default BrandSwiper;
