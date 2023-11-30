import '../../../scss/my_cart/my_cart.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  editItem,
} from '../../../store/state_slices/shopping-cart-slice';
import { itemImageMapping } from '../../../config/item_image_mapping';

function CartItem({
  productId,
  productName,
  productDescription,
  productSize,
  productPrice,
  productAmount,
  isBrandNew,
  isDeletable = true,
}) {
  const baseUrl = 'http://localhost:8080';
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.shoppingCart);

  const self = {
    id: productId,
    name: productName,
    description: productDescription,
    size: productSize,
    price: productPrice,
    quantity: productAmount,
  };

  const toggleRemoveMode = () => {
    setIsRemoveMode(!isRemoveMode);
  };

  const [changeableSizes, setChangeableSize] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/product/findMinPriceProductByNameAndIsBrandNew?name=${productName}&is-brand-new=${
            isBrandNew ? 1 : 0
          }`
        );

        const data = await res.json();
        setChangeableSize(
          data
            .sort((a, b) => Number(a.size) - Number(b.size))
            .filter(
              (item) => !myCart.items.map((each) => each.id).includes(item.id)
            )
        );
      } catch (e) {
        setChangeableSize([]);
      }
    };

    fetchSizes();
  }, [myCart.items]);

  useEffect(() => {
    setIsRemoveMode(false);
  }, [productId]);

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
    <div className={'cart-item'}>
      {!isRemoveMode && isDeletable && (
        <div className={'cart-item__select-button'}>{CheckIcon}</div>
      )}
      <img
        className={'cart-item__img'}
        src={itemImageMapping[productName].snippetImage}
        alt={''}
      ></img>
      <div className={'cart-item__info'}>
        <div
          className={'cart-item__name'}
          onClick={toggleRemoveMode}
          style={!isDeletable ? { cursor: 'initial' } : { cursor: 'pointer' }}
        >
          {productName}
        </div>
        <div className={'cart-item__sub-name'}>{productDescription}</div>
        <div className={'cart-item__size'}>
          <div>Size:</div>
          <div className="dropdown">
            <button
              className="cart-item__dropdown dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={!isDeletable}
            >
              {productSize} US
            </button>
            <ul
              className="size-dropdown-menu dropdown-menu"
              style={{ width: '0px' }}
            >
              {changeableSizes.map((each, i) => {
                return (
                  <li
                    key={i}
                    onClick={() =>
                      dispatch(
                        editItem({
                          replaceId: productId,
                          item: each,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    <div className="cart-item__dropdown--item">
                      {each.size}{' '}
                      <span style={{ color: '#9d9d9d' }}>
                        Lowest {each.price}.-
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={'cart-item__tag'}>
          <div
            className={
              isBrandNew ? 'cart-item__tag--new' : 'cart-item__tag--used'
            }
          >
            {isBrandNew ? 'NEW' : 'USED'}
          </div>
        </div>
        <div className={'cart-item__price'}>Price: {productPrice}.-</div>
      </div>
      <div className={'cart-item__amount'}>{productAmount} items</div>
      {isRemoveMode && isDeletable && (
        <div
          className={'cart-item__delete-button'}
          onClick={() => dispatch(removeItem({ item: self, quantity: 1 }))}
        >
          Delete (-1)
        </div>
      )}
    </div>
  );
}

export default CartItem;
