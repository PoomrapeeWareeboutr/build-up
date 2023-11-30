import { useEffect, useState } from 'react';
import '../../scss/my_sell_product/my_sell_product.scss';
import ProductModel from '../../models/ProductModel';
import ItemShowcase from '../homepage/components/ItemShowcase';
import { itemImageMapping } from '../../config/item_image_mapping';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const MySelllProduct = () => {
  const [products, setProducts] = useState([]);
  const [httpError, setHttpError] = useState(null);

  const navigate = useNavigate();
  const handleClick = (item) => {
    const data = { item };

    navigate('/edit-product', { state: { data } });
  };

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const cookies = new Cookies();
      const username = cookies.get('username');

      const url = `http://localhost:8080/api/product/findProductsByUsername/${username}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error found');
      }

      const responseJson = await response.json();

      const loadedSellerProducts = [];

      for (const key in responseJson) {
        const product = new ProductModel(
          responseJson[key].name,
          responseJson[key].description,
          responseJson[key].price,
          responseJson[key].type,
          responseJson[key].size,
          responseJson[key].brandNew
        );

        product.setCreatedAt(responseJson[key].createdAt);

        product.setId(responseJson[key].productId);

        loadedSellerProducts.push(product);
      }

      setProducts(loadedSellerProducts);

      console.log(loadedSellerProducts);
    };
    fetchSellerProducts().catch((error) => {
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    return (
      <div className="product-detail" style={{ margin: '5% 10%' }}>
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="product-detail" style={{ margin: '5% 10%' }}>
      <div className={'search-title'}>My products</div>
      <div className="showcase-list">
        {products.map((item, i) => (
          <div key={i} onClick={() => handleClick(item)}>
            <ItemShowcase
              isAvgPrice={false}
              name={item.name}
              price={item.price}
              imageUrl={itemImageMapping[item.name]?.snippetImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
