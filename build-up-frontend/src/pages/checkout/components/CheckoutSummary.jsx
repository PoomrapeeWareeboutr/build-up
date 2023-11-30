import React, { useContext, useMemo } from 'react';
import '../../../scss/my_cart/my_cart.scss';
import '../../../scss/checkout/checkout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  PaymentSelectionContext,
  ShippingAddressSelectionContext,
} from '../../../data/context';
import Cookies from 'universal-cookie';
import { clear } from '../../../store/state_slices/shopping-cart-slice';
function CheckoutSummary() {
  const myCart = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080';

  const dispatch = useDispatch();
  const [selectedPayment] = useContext(PaymentSelectionContext);
  const [selectedAddress] = useContext(ShippingAddressSelectionContext);

  const TAX_FEE = 7;
  const PROCESS_FEE = 3;

  const transactionFee = useMemo(() => {
    return Number((myCart.totalPrice * (TAX_FEE / 100)).toFixed(2));
  }, [myCart.totalPrice]);

  const paymentProcessingFee = useMemo(() => {
    return Number((myCart.totalPrice * (PROCESS_FEE / 100)).toFixed(2));
  }, [myCart.totalPrice]);

  const totalPrice = useMemo(() => {
    return Number(
      (myCart.totalPrice + transactionFee + paymentProcessingFee).toFixed(2)
    );
  });

  const shortenAddressName = (name) => {
    return name.length > 40 ? `${name.substring(0, 40)}...` : name;
  };

  const isAllowCheckout = () => {
    if (!selectedPayment || !selectedAddress) {
      return false;
    }

    return myCart.items.length >= 1;
  };

  const checkout = async () => {
    if (!isAllowCheckout()) {
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/order/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [selectedPayment.cardId ? 'creditCardId' : 'bankAccountId']:
            selectedPayment.cardId || selectedPayment.bankAccountId,
          shippingAddressId: selectedAddress.addressId,
          items: myCart.items.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
          })),
          token: new Cookies().get('loginToken'),
          totalPrice,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        dispatch(clear());
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={'checkout-page__content-body--right'}>
      <div className={'text-header'} style={{ border: '0' }}>
        <div
          className={'text-header__my-cart-title'}
          style={{ textAlign: 'center' }}
        >
          Checkout
        </div>
      </div>
      <div className={'checkout-page__ship-and-payment'}>
        <div className={'checkout-page__ship-and-payment--info-list'}>
          <div
            className={'checkout-page__ship-and-payment--icon-group'}
            style={{ cursor: 'text', color: '#9d9d9d' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.25 10.5C14.25 9.90326 14.0129 9.33097 13.591 8.90901C13.169 8.48705 12.5967 8.25 12 8.25C11.4033 8.25 10.831 8.48705 10.409 8.90901C9.98705 9.33097 9.75 9.90326 9.75 10.5C9.75 11.0967 9.98705 11.669 10.409 12.091C10.831 12.5129 11.4033 12.75 12 12.75C12.5967 12.75 13.169 12.5129 13.591 12.091C14.0129 11.669 14.25 11.0967 14.25 10.5ZM21 10.5C21 14.811 16.3545 19.524 13.7385 21.837C13.2602 22.2642 12.6413 22.5003 12 22.5003C11.3587 22.5003 10.7398 22.2642 10.2615 21.837C7.6455 19.524 3 14.811 3 10.5C3 9.3181 3.23279 8.14778 3.68508 7.05585C4.13738 5.96392 4.80031 4.97177 5.63604 4.13604C6.47177 3.30031 7.46392 2.63738 8.55585 2.18508C9.64778 1.73279 10.8181 1.5 12 1.5C13.1819 1.5 14.3522 1.73279 15.4442 2.18508C16.5361 2.63738 17.5282 3.30031 18.364 4.13604C19.1997 4.97177 19.8626 5.96392 20.3149 7.05585C20.7672 8.14778 21 9.3181 21 10.5ZM19.5 10.5C19.5 8.51088 18.7098 6.60322 17.3033 5.1967C15.8968 3.79018 13.9891 3 12 3C10.0109 3 8.10322 3.79018 6.6967 5.1967C5.29018 6.60322 4.5 8.51088 4.5 10.5C4.5 12.162 5.4225 14.0925 6.855 16.0245C8.256 17.9115 9.9855 19.59 11.2545 20.7135C11.4587 20.8986 11.7244 21.0011 12 21.0011C12.2756 21.0011 12.5413 20.8986 12.7455 20.7135C14.0145 19.59 15.7455 17.913 17.145 16.0245C18.5775 14.0925 19.5 12.162 19.5 10.5Z"
                fill="#9D9D9D"
              />
            </svg>
            <div>Shipping address</div>
          </div>
          <div
            className={'checkout-page__ship-and-payment--icon-group'}
            onClick={() => navigate('/checkout/form/shipping-address')}
          >
            <div>
              {selectedAddress
                ? shortenAddressName(selectedAddress.name)
                : 'Select'}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M6.65737 2.91634C6.54834 3.02797 6.4873 3.17781 6.4873 3.33384C6.4873 3.48988 6.54834 3.63972 6.65737 3.75134L12.7486 10.0001L6.65737 16.2476C6.54834 16.3592 6.4873 16.5091 6.4873 16.6651C6.4873 16.8211 6.54834 16.971 6.65737 17.0826C6.71037 17.137 6.77373 17.1803 6.84372 17.2098C6.91371 17.2394 6.9889 17.2546 7.06487 17.2546C7.14084 17.2546 7.21604 17.2394 7.28602 17.2098C7.35601 17.1803 7.41938 17.137 7.47237 17.0826L13.9499 10.4363C14.0636 10.3196 14.1273 10.1631 14.1273 10.0001C14.1273 9.8371 14.0636 9.68056 13.9499 9.56384L7.47237 2.91759C7.41938 2.86316 7.35601 2.8199 7.28602 2.79036C7.21604 2.76082 7.14084 2.74561 7.06487 2.74561C6.9889 2.74561 6.91371 2.76082 6.84372 2.79036C6.77373 2.8199 6.71037 2.86316 6.65737 2.91759V2.91634Z"
                fill="#9D9D9D"
              />
            </svg>
          </div>
        </div>
        <div className={'checkout-page__ship-and-payment--info-list'}>
          <div
            className={'checkout-page__ship-and-payment--icon-group'}
            style={{ cursor: 'text', color: '#9d9d9d' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M1.5 7.125C1.5 6.22989 1.85558 5.37145 2.48851 4.73851C3.12145 4.10558 3.97989 3.75 4.875 3.75H19.125C20.0201 3.75 20.8785 4.10558 21.5115 4.73851C22.1444 5.37145 22.5 6.22989 22.5 7.125V16.875C22.5 17.7701 22.1444 18.6285 21.5115 19.2615C20.8785 19.8944 20.0201 20.25 19.125 20.25H4.875C3.97989 20.25 3.12145 19.8944 2.48851 19.2615C1.85558 18.6285 1.5 17.7701 1.5 16.875V7.125ZM4.875 5.25C4.37772 5.25 3.90081 5.44754 3.54917 5.79917C3.19754 6.15081 3 6.62772 3 7.125V8.25H21V7.125C21 6.62772 20.8025 6.15081 20.4508 5.79917C20.0992 5.44754 19.6223 5.25 19.125 5.25H4.875ZM3 16.875C3 17.3723 3.19754 17.8492 3.54917 18.2008C3.90081 18.5525 4.37772 18.75 4.875 18.75H19.125C19.6223 18.75 20.0992 18.5525 20.4508 18.2008C20.8025 17.8492 21 17.3723 21 16.875V9.75H3V16.875ZM15.75 14.25H18C18.1989 14.25 18.3897 14.329 18.5303 14.4697C18.671 14.6103 18.75 14.8011 18.75 15C18.75 15.1989 18.671 15.3897 18.5303 15.5303C18.3897 15.671 18.1989 15.75 18 15.75H15.75C15.5511 15.75 15.3603 15.671 15.2197 15.5303C15.079 15.3897 15 15.1989 15 15C15 14.8011 15.079 14.6103 15.2197 14.4697C15.3603 14.329 15.5511 14.25 15.75 14.25Z"
                fill="#CCCCCC"
              />
            </svg>
            <div>Payment method</div>
          </div>
          <div
            className={'checkout-page__ship-and-payment--icon-group'}
            onClick={() => navigate('/checkout/form/payment-method')}
          >
            <div>{selectedPayment ? selectedPayment.name : 'Select'}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M6.65737 2.91634C6.54834 3.02797 6.4873 3.17781 6.4873 3.33384C6.4873 3.48988 6.54834 3.63972 6.65737 3.75134L12.7486 10.0001L6.65737 16.2476C6.54834 16.3592 6.4873 16.5091 6.4873 16.6651C6.4873 16.8211 6.54834 16.971 6.65737 17.0826C6.71037 17.137 6.77373 17.1803 6.84372 17.2098C6.91371 17.2394 6.9889 17.2546 7.06487 17.2546C7.14084 17.2546 7.21604 17.2394 7.28602 17.2098C7.35601 17.1803 7.41938 17.137 7.47237 17.0826L13.9499 10.4363C14.0636 10.3196 14.1273 10.1631 14.1273 10.0001C14.1273 9.8371 14.0636 9.68056 13.9499 9.56384L7.47237 2.91759C7.41938 2.86316 7.35601 2.8199 7.28602 2.79036C7.21604 2.76082 7.14084 2.74561 7.06487 2.74561C6.9889 2.74561 6.91371 2.76082 6.84372 2.79036C6.77373 2.8199 6.71037 2.86316 6.65737 2.91759V2.91634Z"
                fill="#9D9D9D"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={'checkout-page__summary'}>
        <div className={'checkout-page__ship-and-payment--info-list'}>
          <div>Sub total</div>
          <div className={'checkout-page__ship-and-payment--text-1'}>
            {myCart.totalPrice}.-
          </div>
        </div>
        <div className={'checkout-page__ship-and-payment--info-list'}>
          <div>Transaction fee {TAX_FEE}%</div>
          <div className={'checkout-page__ship-and-payment--text-1'}>
            {transactionFee}.-
          </div>
        </div>
        <div className={'checkout-page__ship-and-payment--info-list'}>
          <div>Payment processing fee {PROCESS_FEE}%</div>
          <div className={'checkout-page__ship-and-payment--text-1'}>
            {paymentProcessingFee}.-
          </div>
        </div>
        <div className={'checkout-page__ship-and-payment--info-list'}>
          <div className={'checkout-page__ship-and-payment--text-2'}>Total</div>
          <div className={'checkout-page__ship-and-payment--text-2'}>
            {totalPrice}.-
          </div>
        </div>
      </div>
      <div className={'checkout-page__button'}>
        <div
          className={'checkout-page__button--style-1'}
          onClick={() => navigate('/my-cart')}
        >
          Cancel
        </div>
        <div
          className={
            isAllowCheckout()
              ? 'checkout-page__button--style-3'
              : 'checkout-page__button--style-2'
          }
          onClick={() => checkout()}
        >
          Submit
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;
