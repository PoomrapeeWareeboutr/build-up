import React, { useState, useContext } from 'react';
import { GoShieldCheck, GoShieldLock } from 'react-icons/go';
import { ReturnSize } from './ReturnSize';
import { ReturnCondition } from './ReturnCondition';
import { HiOutlinePencil } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../data/context';
import { ErrorFetchProductDetail } from './ErrorFetchProductDetail';
import '../../../scss/product_description/product_detail.scss';
import Cookies from 'universal-cookie';

export const Details = () => {
  const navigate = useNavigate();
  const productDetail = useContext(ProductContext);
  const cookies = new Cookies();

  const [size, setSize] = useState(null);
  const [condition, setCondition] = useState(null);
  const [conditionBoolean, setConditionBoolean] = useState(true);
  const [price, setPrice] = useState('');
  const [sizeValidate, setSizeValidate] = useState(true);
  const [conditionValidate, setConditionValidate] = useState(true);
  const [priceValidate, setPriceValidate] = useState(true);

  if (!productDetail) {
    return <ErrorFetchProductDetail />;
  }

  const handleSize = (value) => {
    setSize(value);
  };

  const handleCondition = (value) => {
    setCondition(value);
    if (value === 'USED') {
      setConditionBoolean(false);
    }
  };

  const isAllowNext = () => {
    return size && condition && price && cookies.get('loginToken');
  };

  const handleClick = () => {
    if (!isAllowNext()) {
      return;
    }

    const data = {
      size: size,
      condition: condition,
      conditionBoolean: conditionBoolean,
      price: price,
      method: 'POST',
      name: productDetail.name,
      description: productDetail.description,
    };

    if (
      size !== 'Select size (US)' &&
      condition !== 'Select condition' &&
      price !== ''
    ) {
      navigate('/sell-confirmation', { state: { data } });
    } else {
      if (size === 'Select size (US)') {
        setSizeValidate(false);
      }
      if (condition === 'Select condition') {
        setConditionValidate(false);
      }
      if (price === '') {
        setPriceValidate(false);
      }
    }
  };

  return (
    <div
      className="col"
      style={{ fontFamily: 'Montserrat', marginTop: '3rem' }}
    >
      <div className="row">
        <div className="col">
          <p className="info-header d-flex justify-content-center">
            Listing Information
          </p>
        </div>
      </div>
      <div className="row border-top" style={{ paddingTop: '16px' }}>
        <div className="col" style={{ marginBottom: '16px' }}>
          <div className="info-entry">Product details</div>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: '16px' }}
      >
        <div className="d-flex justify-content-start">
          <div className="info-entry__sub-entry">
            {sizeValidate ? (
              <div> Size </div>
            ) : (
              <div>
                Size <span className="info-entry__sub-entry--danger">*</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="dropdown">
            <button
              className="btn fst-italic dropdown-toggle info-entry__sub-entry--placeholder"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {size ?? 'Select size (US)'}
            </button>
            <ReturnSize handleSize={handleSize} />
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: '32px' }}
      >
        <div className="d-flex justify-content-start">
          <div className="info-entry__sub-entry">
            {conditionValidate ? (
              <div> Condition </div>
            ) : (
              <div>
                Condition{' '}
                <span className="info-entry__sub-entry--danger">*</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle info-entry__sub-entry--placeholder"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {condition ?? 'Select condition'}
            </button>
            <ReturnCondition handleCondition={handleCondition} />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <hr className="hr hr-blurry opacity-10" />
      </div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: '27%' }}
      >
        <div className="d-flex justify-content-start">
          <div className={'info-entry__sub-entry'}>
            {priceValidate ? (
              <div> Ask Price </div>
            ) : (
              <div>
                Ask Price{' '}
                <span className="info-entry__sub-entry--danger">*</span>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <input
            className="info-entry__sub-entry--placeholder"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Add price"
            style={{
              marginRight: '8px',
              border: 'none',
              outline: 'none',
              width: '42%',
              textAlign: 'right',
              height: '73%',
              resize: 'none',
            }}
            name="objectives"
          ></input>
          <HiOutlinePencil size={20} color="#CCCCCC" />
        </div>
      </div>

      <div className="row mt-2">
        <hr className="hr hr-blurry opacity-10" />
      </div>
      <div
        className="d-flex justify-content-center mt-3"
        style={{ gap: '22px' }}
      >
        <div
          className="d-flex justify-content-around"
          style={{ alignItems: 'center' }}
        >
          <GoShieldCheck
            size={32}
            color="#9D9D9D"
            style={{ marginRight: '12px' }}
          />
          <div>100% Authentic Guarantee</div>
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ alignItems: 'center' }}
        >
          <GoShieldLock
            size={32}
            color="#9D9D9D"
            style={{ marginRight: '12px' }}
          />
          <div>Anti Fraudulent transaction</div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <div className="d-flex justify-content-around" style={{ width: '49%' }}>
          <button
            className="btn text-light"
            type="button"
            style={{
              width: '100%',
              height: '50px',
              borderRadius: '8px',
              backgroundColor: 'black',
              fontSize: '18px',
            }}
            onClick={() =>
              navigate(`/product/${productDetail.name}/description`)
            }
          >
            Back
          </button>
        </div>
        <div className="d-flex justify-content-around" style={{ width: '49%' }}>
          <button
            className={`btn text-light ${
              isAllowNext() ? 'next-btn--allow' : 'next-btn--not-allow'
            }`}
            type="button"
            style={{
              width: '100%',
              height: '50px',
              borderRadius: '8px',
              fontSize: '18px',
            }}
            onClick={() => handleClick()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
