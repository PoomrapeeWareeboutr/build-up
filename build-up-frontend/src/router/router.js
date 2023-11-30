import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/homepage/HomePage';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import { ProductDescription } from '../pages/product_description/ProductDescription';
import ShoppingCart from '../pages/cart/ShoppingCart';
import { ProductCheckout } from '../pages/product_checkout/ProductCheckout';
import { MySelllProduct } from '../pages/my_sell_product/MySellProduct';
import { EditProduct } from '../pages/edit_product/EditProduct';
import BuyerCheckout from '../pages/checkout/BuyerCheckout';
import { SizeSelection } from '../pages/product_description/components/SizeSelection';
import CheckoutForm from '../pages/checkout/components/CheckoutForm';
import CheckoutAddressForm from '../pages/checkout/components/CheckoutAddressForm';
import PaymentMethodForm from '../pages/checkout/components/PaymentMethodForm';
import CheckoutSummary from '../pages/checkout/components/CheckoutSummary';
import { Description } from '../pages/product_description/components/Description';
import { Details } from '../pages/product_description/components/Details';
import { SearchResult } from '../pages/search_result/SearchResult';
import BillHistory from '../pages/bill-history/BillHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/buying-history',
        element: <BillHistory />,
      },
      {
        path: '/product/:productName',
        element: <ProductDescription />,
        children: [
          {
            path: '/product/:productName/description',
            element: <Description />,
          },
          {
            path: '/product/:productName/sell',
            element: <Details />,
          },
          {
            path: '/product/:productName/buy',
            element: <SizeSelection />,
          },
        ],
      },
      {
        path: '/search-result',
        element: <SearchResult />,
      },
      {
        path: '/my-cart',
        element: <ShoppingCart />,
      },
      {
        path: '/sell-confirmation',
        element: <ProductCheckout />,
      },
      {
        path: '/my-sell-product',
        element: <MySelllProduct />,
      },
      {
        path: '/edit-product',
        element: <EditProduct />,
      },
      {
        path: '/checkout',
        element: <BuyerCheckout />,
        children: [
          {
            path: '/checkout/summary',
            element: <CheckoutSummary />,
          },
          {
            path: '/checkout/form',
            element: <CheckoutForm />,
            children: [
              {
                path: '/checkout/form/shipping-address',
                element: <CheckoutAddressForm />,
              },
              {
                path: '/checkout/form/payment-method',
                element: <PaymentMethodForm />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);
