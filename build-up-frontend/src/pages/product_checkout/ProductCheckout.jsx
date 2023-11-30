import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { GoCreditCard } from 'react-icons/go';
import { FiMapPin } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductModel from '../../models/ProductModel';
import '../../scss/my_sell_product/sell_checkout.scss';
import { itemImageMapping } from '../../config/item_image_mapping';
import Cookies from 'universal-cookie';
export const ProductCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});

  useEffect(() => {
    if (location.state && location.state.data) {
      setData(location.state.data);
    } else {
      console.error('Data is not available in location state.');
    }
  }, [location.state]);

  const handleClick1 = () => {
    navigate(-1);
  };

  async function addProduct() {
    const cookies = new Cookies();
    const username = cookies.get('username');

    const url = `http://localhost:8080/api/product/addProduct/${username}`;
    if (
      data.size !== 'Select size (US)' &&
      data.condition !== 'Select condition' &&
      data.price !== ''
    ) {
      const product = new ProductModel(
        data.name,
        data.description,
        parseFloat(data.price),
        'shoes',
        data.size,
        data.conditionBoolean
      );
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const formattedTime = new Date(
        `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
      );
      product.setCreatedAt(formattedTime);

      const request = {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      console.log(JSON.stringify(product));

      const addNewProduct = await fetch(url, request);
      if (!addNewProduct.ok) {
        throw new Error('Error found');
      }

      navigate('/my-sell-product');
    }
  }

  async function editProduct() {
    const url = `http://localhost:8080/api/product/editProduct/${data.item.id}`;
    if (data && data.item && data.item.price > 0) {
      const product = new ProductModel(
        data.item.name,
        data.item.description,
        parseFloat(data.price),
        data.item.type,
        data.size,
        data.conditionBoolean
      );
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const formattedTime = new Date(
        `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
      );
      product.setCreatedAt(formattedTime);

      const request = {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const editProductById = await fetch(url, request);
      if (!editProductById) {
        throw new Error('Error found');
      }

      navigate('/my-sell-product');
    }
  }

  return (
    <div className="product-detail">
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
        <div>Product</div>
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
        <div>{(data && data.name) || (data?.item && data.item.name)}</div>
      </div>

      <div className="row" style={{ gap: '64px' }}>
        <div className="col" style={{ marginTop: '80px' }}>
          <div className="row" style={{ marginLeft: '3%' }}>
            <div className="d-flex justify-content-start">
              <div style={{ marginRight: '5%' }}>
                <img
                  className="img_shoe"
                  style={{ width: '160px', height: '130px' }}
                  src={
                    itemImageMapping[
                      (data && data.name) || (data?.item && data.item.name)
                    ]?.snippetImage
                  }
                />
              </div>
              <div>
                <p className="sell-checkout__font">Summary Product detail</p>
                <p className="sell-checkout__product-name-font">
                  {(data && data.name) || (data?.item && data.item.name)}
                </p>
                <p
                  className="sell-checkout__desc-font"
                  style={{ color: '#9D9D9D' }}
                >
                  {(data && data.description) ||
                    (data?.item && data.item.description)}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-2 m">
            <hr
              className="hr hr-blurry opacity-10"
              style={{ marginLeft: '2%' }}
            />
          </div>
          {data && (
            <div className="d-flex justify-content-between mt-4">
              <div className="d-flex justify-content-start">
                <div>
                  <p
                    className="sell-checkout__info-entry"
                    style={{ color: '#9D9D9D' }}
                  >
                    Ask Price
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <div>
                  <p className="sell-checkout__info-entry--bold">
                    {(data && data.price) || (data?.item && data.item.price)}.-
                  </p>
                </div>
              </div>
            </div>
          )}
          {data && (
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <div>
                  <p
                    className="sell-checkout__info-entry"
                    style={{ color: '#9D9D9D' }}
                  >
                    Size
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <div>
                  <p className="sell-checkout__info-entry--bold">
                    US {(data && data.size) || (data?.item && data.item.size)}
                  </p>
                </div>
              </div>
            </div>
            // ... (other parts that use data properties)
          )}
          <div className="d-flex justify-content-between ">
            <div className="d-flex justify-content-start ">
              <div>
                <p
                  className="sell-checkout__info-entry"
                  style={{ color: '#9D9D9D' }}
                >
                  Condition
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div>
                <p className="sell-checkout__info-entry--bold">
                  {data && data.conditionBoolean ? 'Brand new' : 'Used'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col"
          style={{ fontFamily: 'Montserrat', marginTop: '80px' }}
        >
          <div className="row">
            <div className="d-flex justify-content-center">
              <p className="sell-checkout__font">Confirmation</p>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex justify-content-start align-items-center">
              <GoCreditCard
                size={27}
                color="#9D9D9D"
                style={{ marginRight: '17px' }}
              />
              <div>
                <div
                  className="sell-checkout__info-entry"
                  style={{ color: '#9D9D9D' }}
                >
                  Payment method
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ gap: '4px' }}
            >
              <div>
                <div
                  className="sell-checkout__info-entry"
                  style={{ color: '#9D9D9D' }}
                >
                  Account Setting
                </div>
              </div>
              <IoIosArrowForward size={24} color="#9D9D9D" />
            </div>
          </div>
          <div className="row mt-2">
            <hr class="hr hr-blurry opacity-10" />
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div className="d-flex justify-content-start ">
              <div>
                <p
                  className="sell-checkout__info-entry"
                  style={{ color: '#9D9D9D' }}
                >
                  Sub Total
                </p>
              </div>
            </div>
            {data && (
              <div className="d-flex justify-content-end">
                <div>
                  <p className="sell-checkout__info-entry--bold">
                    {(data && data.price) || (data?.item && data.item.price)}.-
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between ">
            <div className="d-flex justify-content-start ">
              <div>
                <p
                  className="sell-checkout__info-entry"
                  style={{ color: '#9D9D9D' }}
                >
                  Transaction Fee 7%
                </p>
              </div>
            </div>
            {data && (
              <div className="d-flex justify-content-end">
                <div>
                  <p className="sell-checkout__info-entry--bold">
                    {(((data && data.price) ||
                      (data?.item && data.item.price)) *
                      7) /
                      100}
                    .-
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between ">
            <div className="d-flex justify-content-start ">
              <div>
                <p
                  className="sell-checkout__info-entry"
                  style={{ color: '#9D9D9D' }}
                >
                  Payment Processing Fee 3%
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div>
                <p className="sell-checkout__info-entry--bold">
                  {(((data && data.price) || (data?.item && data.item.price)) *
                    3) /
                    100}
                  .-
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-5">
            <div className="d-flex justify-content-start ">
              <div>
                <p
                  className="sell-checkout__info-entry--green"
                  style={{ color: '#00B227' }}
                >
                  Total
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div>
                <p
                  className="sell-checkout__info-entry--green"
                  style={{ color: '#00B227' }}
                >
                  {((data && data.price) || (data?.item && data.item.price)) -
                    (((data && data.price) || (data?.item && data.item.price)) *
                      7) /
                      100 -
                    (((data && data.price) || (data?.item && data.item.price)) *
                      3) /
                      100}
                  .-
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div
              className="d-flex justify-content-around"
              style={{ width: '49%' }}
            >
              <button
                className="btn text-secondary"
                type="button"
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #9D9D9D',
                  fontSize: '18px',
                }}
                onClick={handleClick1}
              >
                Cancel
              </button>
            </div>
            <div
              className="d-flex justify-content-around"
              style={{ width: '49%' }}
            >
              <button
                className=" btn text-light"
                type="button"
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  backgroundColor: '#00b227',
                  fontSize: '18px',
                }}
                onClick={data.method === 'POST' ? addProduct : editProduct}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
