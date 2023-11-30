import '../../../scss/product_description/size_selection.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../store/state_slices/shopping-cart-slice';

export const SizePool = (props) => {
  const [sizePool, setSizePool] = useState([]);
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.shoppingCart);

  const { productName } = useParams();
  const baseUrl = 'http://localhost:8080';
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const selectItem = (item) => {
    if (!isInCart(item.id)) {
      setSelectedItem(item);
    }
  };

  const addToCartButtonStyle = () => {
    return selectedItem
      ? 'button-container__button'
      : 'button-container__button--disable';
  };

  const checkoutButtonStyle = () => {
    return selectedItem || myCart.items.length > 0
      ? 'button-container__button--green'
      : 'button-container__button--disable';
  };

  const addToCart = () => {
    if (selectedItem) {
      dispatch(addItem({ item: selectedItem, quantity: 1 }));
      setSelectedItem(null);
    }
  };

  const checkout = () => {
    if (selectedItem) {
      dispatch(addItem({ item: selectedItem, quantity: 1 }));
      setSelectedItem(null);
      navigate('/checkout/summary');
    } else if (myCart.items.length > 0) {
      setSelectedItem(null);
      navigate('/checkout/summary');
    }
  };

  const isInCart = (id) => {
    return myCart.items.find((item) => item.id === id);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/product/findMinPriceProductByNameAndIsBrandNew?name=${productName}&is-brand-new=${
            props.isBrandNew ? 1 : 0
          }`
        );

        const data = await res.json();
        setSizePool(data.sort((a, b) => Number(a.size) - Number(b.size)));
      } catch (e) {
        setSizePool([]);
      }
    };

    fetchProducts();
  }, [productName, props.isBrandNew]);

  const selectedStyle = (id) => {
    if (selectedItem) {
      return selectedItem.id === id
        ? 'select-type__selected-box'
        : 'select-type__box';
    }
    return 'select-type__box';
  };

  const checkoutText = () => {
    const itemNumber = myCart.items.length;
    const itemNumberString = itemNumber > 100 ? '99+' : `${itemNumber}`;

    if (itemNumber > 0 && selectedItem) {
      return `+ 1 and Checkout (${itemNumberString})`;
    }
    return itemNumber > 0 ? `Checkout (${itemNumberString})` : 'Checkout';
  };

  return (
    <>
      <div className={'select-type__second-desc'}>
        <div className={'select-type__size-desc'}>Size (US Unisex)</div>
        <div
          className={'select-type__size-chart'}
          onClick={() => setSelectedItem(null)}
        >
          Deselect
        </div>
      </div>
      <div className={'select-type__size-pool'}>
        {sizePool.length !== 0 ? (
          sizePool.map((each) => {
            return (
              <div
                key={each.id}
                className={
                  isInCart(each.id)
                    ? 'select-type__not-available'
                    : selectedStyle(each.id)
                }
                onClick={() => selectItem(each)}
              >
                <div>
                  <div
                    className={
                      isInCart(each.id)
                        ? 'select-type__box--in-cart-size'
                        : 'select-type__box--size'
                    }
                  >
                    US {each.size}
                  </div>
                  <div
                    className={
                      isInCart(each.id)
                        ? 'select-type__box--in-cart-price'
                        : 'select-type__box--price'
                    }
                  >
                    {each.price}.-
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={'select-type__no-item'}>
            Sorry, there is no related item...
          </div>
        )}
      </div>
      <div className={'button-container'}>
        <div className={addToCartButtonStyle()} onClick={addToCart}>
          Add to cart
        </div>
        <div className={checkoutButtonStyle()} onClick={checkout}>
          {checkoutText()}
        </div>
      </div>
    </>
  );
};
