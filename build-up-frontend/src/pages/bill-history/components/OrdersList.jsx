import '../../../scss/bill-history/bill_history.scss';
function OrdersList({ orders, onSelect }) {
  const ids = Object.keys(orders).sort((a, b) => b - a);

  const calculatePrice = (id) => {
    const totalPrice = orders[id].items.reduce((price, item) => {
      return price + item.price;
    }, 0);

    return Number((totalPrice + totalPrice * 0.1).toFixed(2));
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    return dateObject.toLocaleDateString(undefined, options);
  };

  return (
    <div className={'order-list__each-container'}>
      {ids.map((id) => {
        return (
          <div
            className={'order-list__each'}
            onClick={() => onSelect(orders[id].items)}
          >
            <div>
              <div className={'order-id-text'}>Order ID: {id}</div>
              <div className={'order-desc-text'}>Status: Ordered</div>
              <div className={'order-desc-text'}>
                Purchase Date: {formatDate(orders[id].items[0].purchaseDate)}
              </div>
              <div className={'order-desc-text__price'}>
                Total Price: {calculatePrice(id)}.-
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="gray"
              className="bi bi-box-arrow-in-up-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
              />
              <path
                fill-rule="evenodd"
                d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
export default OrdersList;
