import React, { useState } from 'react';
import { GoShieldCheck, GoShieldLock } from 'react-icons/go';
import { HiOutlinePencil } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ReturnSize } from '../../product_description/components/ReturnSize';
import { ReturnCondition } from '../../product_description/components/ReturnCondition';
import '../../../scss/product_description/product_detail.scss';
export const EditInfo = (props) => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [size, setSize] = useState(props.data.item.size);
  const [condition, setCondition] = useState(
    props.data.item.brandNew ? 'NEW' : 'USED'
  );
  const [conditionBoolean, setConditionBoolean] = useState(true);
  const [price, setPrice] = useState(props.data.item.price);

  const handleSize = (value) => {
    setSize(value);
  };

  const handleCondition = (value) => {
    setCondition(value);
    if (value === 'USED') {
      setConditionBoolean(false);
    }
  };

  const handleClick = () => {
    props.data.item.price = price;
    const data = {
      name: props.data.item.name,
      price: price,
      size: size,
      item: props.data.item,
      conditionBoolean: conditionBoolean,
      method: 'put',
    };

    navigate('/sell-confirmation', { state: { data } });
  };

  return (
    <div className="col" style={{ fontFamily: 'Montserrat', marginTop: '3%' }}>
      <div className="row">
        <div className="col">
          <p className="info-header d-flex justify-content-center">
            Editing Information
          </p>
        </div>
      </div>
      <div className="row mt-2">
        <hr className="hr hr-blurry opacity-10" />
      </div>
      <div className="row">
        <div className="col">
          <p className="info-entry">Product details</p>
        </div>
      </div>
      <div className="d-flex justify-content-between ">
        <div
          className="d-flex justify-content-start "
          style={{ paddingTop: '1%' }}
        >
          <div style={{ marginRight: '8.7%' }}>
            <p className="info-entry__sub-entry">Size</p>
          </div>
          <div>
            <p className="info-entry__sub-entry--danger">*</p>
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
              {size}
            </button>
            <ReturnSize handleSize={handleSize} />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div
          className="d-flex justify-content-start"
          style={{ paddingTop: '1%' }}
        >
          <div style={{ marginRight: '4.7%' }}>
            <p className="info-entry__sub-entry">Condition</p>
          </div>
          <div>
            <p className="info-entry__sub-entry--danger">*</p>
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
              {condition}
            </button>
            <ReturnCondition handleCondition={handleCondition} />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <hr class="hr hr-blurry opacity-10" />
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ marginBottom: '27%' }}
      >
        <div className="d-flex justify-content-start">
          <div className={'info-entry__sub-entry'}>
            Ask Price <span className="info-entry__sub-entry--danger">*</span>
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
              border: 'none',
              outline: 'none',
              width: '42%',
              textAlign: 'right',
              height: '73%',
              resize: 'none',
              marginRight: '8px',
            }}
            name="objectives"
          ></input>
          <HiOutlinePencil size={22} color="#CCCCCC" />
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
            onClick={() => props.handleComponent('/rem')}
          >
            Back
          </button>
        </div>
        <div className="d-flex justify-content-around" style={{ width: '49%' }}>
          <button
            className=" btn text-light"
            type="button"
            style={{
              width: '100%',
              height: '50px',
              borderRadius: '8px',
              backgroundColor: '#00B227',
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
