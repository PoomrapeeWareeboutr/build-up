import React from 'react';
import '../../../scss/homepage/homepage.scss';

function BrandIcon({ name, logoUrl }) {
  return (
    <div className="brand-slot">
      <div className="brand-slot__icon">
        <img className="brand-slot__icon--img" alt="" src={logoUrl} />
      </div>
      <div className="brand-slot__font">{name}</div>
    </div>
  );
}

export default BrandIcon;
