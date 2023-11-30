import '../../scss/my_cart/my_cart.scss';
import '../../scss/checkout/checkout.scss';
import React, { useEffect, useState } from 'react';
import CartItem from '../cart/components/CartItem';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  PaymentSelectionContext,
  ShippingAddressSelectionContext,
} from '../../data/context';

function BuyerCheckout() {
  const myCart = useSelector((state) => state.shoppingCart);

  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === '/checkout' ||
      location.pathname === '/checkout/'
    ) {
      navigate('/checkout/summary');
    }
  }, [location.pathname]);

  return (
    <div className={'checkout-page'}>
      <div className="path">
        <div>Home</div>
        <div style={{ marginLeft: '1%', marginRight: '1%' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="17"
            viewBox="0 0 7 13"
            fill="none"
          >
            <path
              d="M0.325994 0.833001C0.238772 0.922299 0.189941 1.04217 0.189941 1.167C0.189941 1.29183 0.238772 1.4117 0.325994 1.501L5.19899 6.5L0.325994 11.498C0.238772 11.5873 0.189941 11.7072 0.189941 11.832C0.189941 11.9568 0.238772 12.0767 0.325994 12.166C0.368391 12.2095 0.41908 12.2442 0.475071 12.2678C0.531063 12.2914 0.59122 12.3036 0.651994 12.3036C0.712768 12.3036 0.772926 12.2914 0.828918 12.2678C0.884909 12.2442 0.935598 12.2095 0.977994 12.166L6.15999 6.849C6.25101 6.75563 6.30195 6.63039 6.30195 6.5C6.30195 6.36961 6.25101 6.24437 6.15999 6.151L0.977994 0.834001C0.935598 0.790458 0.884909 0.755849 0.828918 0.732218C0.772926 0.708586 0.712768 0.696411 0.651994 0.696411C0.59122 0.696411 0.531063 0.708586 0.475071 0.732218C0.41908 0.755849 0.368391 0.790458 0.325994 0.834001V0.833001Z"
              fill="#9D9D9D"
            />
          </svg>
        </div>
        <div>Checkout</div>
      </div>
      <div className={'checkout-page__content-body'}>
        <div className={'checkout-page__content-body--left'}>
          <div className={'text-header'}>
            <div className={'text-header__my-cart-title'}>Product detail</div>
            <div className={'text-header__my-cart-subtitle'}>
              Please check all detail before checkout
            </div>
          </div>
          <div>
            <div className={'cart-item-list'}>
              {myCart.items.length !== 0 ? (
                myCart.items.map((item, i) => (
                  <CartItem
                    key={i}
                    productId={item.id}
                    productName={item.name}
                    productDescription={item.description}
                    productAmount={item.quantity}
                    productSize={item.size}
                    productPrice={item.price}
                    isBrandNew={item.isBrandNew}
                    isDeletable={false}
                  />
                ))
              ) : (
                <div className={'cart-item__no-item'}>No item in cart...</div>
              )}
            </div>
          </div>
        </div>
        <PaymentSelectionContext.Provider
          value={[selectedCreditCard, setSelectedCreditCard]}
        >
          <ShippingAddressSelectionContext.Provider
            value={[selectedShippingAddress, setSelectedShippingAddress]}
          >
            <Outlet />
          </ShippingAddressSelectionContext.Provider>
        </PaymentSelectionContext.Provider>
      </div>
    </div>
  );
}

export default BuyerCheckout;
