import React, { useEffect, useState } from 'react';
import '../../scss/product_description/product_description.scss';
import { Outlet, useParams } from 'react-router-dom';
import { ProductContext } from '../../data/context';
import { itemImageMapping } from '../../config/item_image_mapping';

export const ProductDescription = () => {
  const baseUrl = 'http://localhost:8080';

  const [productDetail, setProductDetail] = useState(null);
  const { productName } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/product/groupByName/${productName}`
        );
        const data = await res.json();
        setProductDetail(data.data);
      } catch (e) {}
    };

    fetchDetail();
  }, []);

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
        <div>{productDetail ? productName : 'Not found'}</div>
      </div>

      <div className="row">
        <div
          className="col mt-5"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            className="img_shoes"
            src={itemImageMapping[productDetail?.name]?.detailImage}
            alt={''}
          />
        </div>
        <ProductContext.Provider value={productDetail}>
          <Outlet />
        </ProductContext.Provider>
      </div>
    </div>
  );
};
