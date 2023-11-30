import React, { useContext } from 'react';
import '../../../scss/product_description/size_selection.scss';
import { useState } from 'react';
import { SizePool } from './SizePool';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorFetchProductDetail } from './ErrorFetchProductDetail';
import { ProductContext } from '../../../data/context';

export const SizeSelection = () => {
  const [isNewType, setIsNewType] = useState(true);
  const productDetail = useContext(ProductContext);

  const navigate = useNavigate();
  const { productName } = useParams();

  if (!productDetail) {
    return <ErrorFetchProductDetail />;
  }

  const toggleSelectMode = () => {
    setIsNewType(!isNewType);
  };

  const navigateBack = () => {
    navigate(`/product/${productName}/description`);
  };

  return (
    <div
      className="col"
      style={{ fontFamily: 'Montserrat', marginTop: '3rem' }}
    >
      <div
        className="row"
        style={{
          borderBottom: '1px solid #E3E3E3',
          marginLeft: '0',
          marginRight: '0',
        }}
      >
        <div className="col header">
          <div className={'header__back-button'} onClick={navigateBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="22"
              viewBox="0 0 11 22"
              fill="none"
            >
              <path
                d="M9.31691 1.08453L0.248414 10.3875C0.0891401 10.5509 0 10.7701 0 10.9983C0 11.2265 0.0891401 11.4456 0.248414 11.609L9.31691 20.9155C9.39111 20.9917 9.47981 21.0523 9.5778 21.0937C9.67578 21.135 9.78106 21.1563 9.88741 21.1563C9.99377 21.1563 10.099 21.135 10.197 21.0937C10.295 21.0523 10.3837 20.9917 10.4579 20.9155C10.6106 20.7593 10.696 20.5495 10.696 20.331C10.696 20.1126 10.6106 19.9028 10.4579 19.7465L1.93016 10.9983L10.4579 2.25178C10.61 2.09559 10.6952 1.88618 10.6952 1.66816C10.6952 1.45013 10.61 1.24072 10.4579 1.08453C10.3837 1.00833 10.295 0.947766 10.197 0.906411C10.099 0.865056 9.99377 0.84375 9.88741 0.84375C9.78106 0.84375 9.67578 0.865056 9.5778 0.906411C9.47981 0.947766 9.39111 1.00833 9.31691 1.08453Z"
                fill="#E3E3E3"
              />
            </svg>
          </div>
          <div className="fs-5 fw-semibold header__text">Buy</div>
          <div className={'header__close-button'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M6.80566 6.80566L21.1946 21.1946M21.1946 6.80566L6.80566 21.1946"
                stroke="#E3E3E3"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={'select-type'}>
        <div
          className={
            isNewType ? 'select-type__button--selected' : 'select-type__button'
          }
          onClick={toggleSelectMode}
        >
          NEW
        </div>
        <div
          className={
            isNewType ? 'select-type__button' : 'select-type__button--selected'
          }
          onClick={toggleSelectMode}
        >
          USED
        </div>
      </div>
      <SizePool isBrandNew={isNewType} />
    </div>
  );
};
