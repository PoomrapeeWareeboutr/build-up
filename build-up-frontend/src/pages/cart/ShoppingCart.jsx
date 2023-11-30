import React from 'react';
import '../../scss/product_description/product_description.scss';
import '../../scss/my_cart/my_cart.scss';
import CartItem from './components/CartItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
  const myCart = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();

  const checkout = () => {
    if (myCart.items.length !== 0) {
      navigate('/checkout');
    }
  };

  const CheckIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="gray"
      className="bi bi-check-square-fill"
      viewBox="0 0 16 16"
    >
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
    </svg>
  );

  return (
    <div className={'product-detail'}>
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
        <div>My cart</div>
      </div>
      <div className={'cart-container'}>
        <div className={'text-header'}>
          <div className={'text-header__my-cart-title'}>My shopping cart</div>
          <div className={'text-header__my-cart-subtitle'}>
            You have 1 item in your cart
          </div>
        </div>
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
              />
            ))
          ) : (
            <div className={'cart-item__no-item'}>No item in cart...</div>
          )}
        </div>
        <div className={'checkout'}>
          <div className={'checkout__total-button'}>
            <div className={'cart-item__select-button'} style={{ margin: '0' }}>
              {CheckIcon}
            </div>
            <div className={'checkout__total-text'}>Total</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={
                myCart.totalPrice === 0
                  ? 'checkout__price--none'
                  : 'checkout__price'
              }
            >
              {myCart.totalPrice}.-
            </div>
            <div
              className={
                myCart.totalPrice === 0
                  ? 'checkout__button--none'
                  : 'checkout__button'
              }
              onClick={checkout}
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
