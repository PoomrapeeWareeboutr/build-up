import '../../../scss/my_cart/my_cart.scss';
import '../../../scss/checkout/checkout.scss';
import '../../../scss/checkout/checkout_form.scss';

import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function CheckoutForm() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === '/checkout/form' ||
      location.pathname === '/checkout/form/'
    ) {
      navigate('/checkout/summary');
    }
  }, [location.pathname]);

  return (
    <div className={'checkout-page__content-body--right'}>
      <div
        className={'text-header back-text-group'}
        style={{ border: '0' }}
        onClick={() => navigate('/checkout/summary')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.903 2.91759L5.42549 9.56259C5.31172 9.67931 5.24805 9.83585 5.24805 9.99884C5.24805 10.1618 5.31172 10.3184 5.42549 10.4351L11.903 17.0826C11.956 17.137 12.0193 17.1803 12.0893 17.2098C12.1593 17.2394 12.2345 17.2546 12.3105 17.2546C12.3865 17.2546 12.4617 17.2394 12.5316 17.2098C12.6016 17.1803 12.665 17.137 12.718 17.0826C12.827 16.971 12.8881 16.8211 12.8881 16.6651C12.8881 16.5091 12.827 16.3592 12.718 16.2476L6.62674 9.99884L12.718 3.75134C12.8266 3.63978 12.8874 3.4902 12.8874 3.33447C12.8874 3.17874 12.8266 3.02916 12.718 2.91759C12.665 2.86316 12.6016 2.8199 12.5316 2.79036C12.4617 2.76082 12.3865 2.74561 12.3105 2.74561C12.2345 2.74561 12.1593 2.76082 12.0893 2.79036C12.0193 2.8199 11.956 2.86316 11.903 2.91759Z"
            fill="#252525"
          />
        </svg>
        <div
          className={'text-header__my-cart-title'}
          style={{ textAlign: 'left', margin: '0' }}
        >
          Back
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CheckoutForm;
