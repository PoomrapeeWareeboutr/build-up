import React, { useContext } from 'react';
import { IoIosFlash } from 'react-icons/io';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { GoShieldCheck, GoPackage, GoShieldLock } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../data/context';
import { ErrorFetchProductDetail } from './ErrorFetchProductDetail';
import Cookies from 'universal-cookie';

export const Description = () => {
  const navigate = useNavigate();

  const productDetail = useContext(ProductContext);

  const navigateToBuyerPath = () => {
    navigate(`/product/${productDetail.name}/buy`);
  };

  const navigateToSellerPath = async () => {
    const cookies = new Cookies();
    const token = cookies.get('loginToken');
    const username = cookies.get('username');
    const url = `http://localhost:8080/api/auth/verify?subject=${username}&token=${token}`;

    const request = {
      method: 'GET',
    };

    const response = await fetch(url, request);

    if (response.ok) {
      navigate(`/product/${productDetail.name}/sell`);
    } else {
      navigate('/sign-in');
    }
  };

  if (!productDetail) {
    return <ErrorFetchProductDetail />;
  }

  return (
    <div
      className="col"
      style={{ fontFamily: 'Montserrat', marginTop: '3rem' }}
    >
      <div className="row">
        <div className="col">
          <p className="fs-5 fw-semibold">{productDetail.name}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="fs-6 fw-lighter text-secondary">
            {productDetail.description}
          </p>
        </div>
      </div>
      <div className="row mt-1">
        <hr class="hr hr-blurry opacity-10" />
      </div>
      <div className="row">
        <div className="col">
          <p className="fs-5 fw-medium">Available Listing</p>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <div className="row ">
            <div
              className="d-flex justify-content-center"
              style={{ justifyContent: 'center' }}
            >
              <p
                className="rounded-pill text-light"
                style={{
                  backgroundColor: '#00B227',
                  paddingLeft: '10px',
                  paddingRight: '8px',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  width: '62px',
                  marginBottom: '8px',
                }}
              >
                NEW
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="d-flex justify-content-center">
              <p className="fs-6"> Brand New</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center">
              <p
                className="rounded-pill text-dark"
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingLeft: '10px',
                  paddingRight: '11px',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  width: '68px',
                  marginBottom: '5px',
                  border: '1px solid #00B227',
                }}
              >
                USED
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="d-flex justify-content-center">
              <p className="fs-6">Pre-owned</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center">
              <div
                style={{
                  borderRadius: '50%',
                  backgroundColor: '#E3E3E3',
                  paddingLeft: '6px',
                  paddingRight: '5px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  width: '40px',
                  height: '40px',
                }}
              >
                <IoIosFlash size={27} color="#00B227" />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="d-flex justify-content-center">
              <p className="fs-6"> Ready to ship</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="row">
            <div className="d-flex justify-content-center">
              <div
                style={{
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  paddingLeft: '6.5px',
                  paddingRight: '5px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  width: '40px',
                  height: '40px',
                }}
              >
                <BiSolidPlaneAlt size={27} color="#CCCCCC" />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="d-flex justify-content-center">
              <p className="fs-6"> Pre-order</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <hr class="hr hr-blurry opacity-10" />
      </div>
      <div className="row">
        <div className="col">
          <p className="fs-5 fw-medium">Delivery</p>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div>
          <p className="fs-5 fw-medium">
            <div>
              <div
                className="mt-2 me-4"
                style={{
                  borderRadius: '50%',
                  backgroundColor: '#E3E3E3',
                  paddingLeft: '6px',
                  paddingRight: '5px',
                  paddingTop: '5px',
                  paddingBottom: '0px',
                  width: '40px',
                  height: '40px',
                }}
              >
                <IoIosFlash size={27} color="#00B227" />
              </div>
            </div>
          </p>
        </div>
        <div>
          <div className="row">
            <p className="fs-6 fw-medium text-dark">Express delivery</p>
          </div>
          <div className="row">
            <p className="fs-6 fw-medium text-secondary">
              Schedule delivery after authentication
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div>
          <p className="fs-4 fw-medium">
            <div>
              <div
                className="mt-2 me-4"
                style={{
                  borderRadius: '50%',
                  backgroundColor: '#E3E3E3',
                  paddingLeft: '8px',
                  paddingRight: '5px',
                  paddingTop: '7px',
                  paddingBottom: '0px',
                  width: '40px',
                  height: '40px',
                }}
              >
                <GoPackage size={24} color="#00B227" />
              </div>
            </div>
          </p>
        </div>
        <div>
          <div className="row">
            <p className="fs-6 fw-medium text-dark">Standard delivery</p>
          </div>
          <div className="row">
            <p className="fs-6 fw-medium text-secondary">
              Ship via logistic partner (2-4 days)
            </p>
          </div>
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
        <div
          className="d-flex justify-content-around"
          style={{ width: '48.85%' }}
        >
          <button
            className="btn text-light"
            type="button"
            style={{
              width: '100%',
              height: '45px',
              borderRadius: '8px',
              backgroundColor: 'black',
              fontSize: '18px',
            }}
            onClick={navigateToSellerPath}
          >
            Sell
          </button>
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ width: '48.85%' }}
        >
          <button
            className=" btn text-light"
            type="button"
            style={{
              width: '100%',
              height: '45px',
              borderRadius: '8px',
              backgroundColor: '#00B227',
              fontSize: '18px',
            }}
            onClick={navigateToBuyerPath}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
