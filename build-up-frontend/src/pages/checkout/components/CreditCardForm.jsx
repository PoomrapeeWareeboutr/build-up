import InputText from './InputText';
import '../../../scss/checkout/checkout.scss';
import '../../../scss/checkout/checkout_form.scss';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';

function CreditCardForm({ onCollapse, onAdd }) {
  const cookies = new Cookies();

  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(null);

  const isAllowAdd = () => {
    return (
      cardNumber &&
      holderName &&
      expirationDate &&
      cvv &&
      cookies.get('loginToken')
    );
  };

  const handleAddCreditCard = async (e) => {
    e.preventDefault();

    if (!isAllowAdd()) {
      return;
    }

    const creditCard = {
      cardNumber,
      holderName,
      expirationDate,
      cvv,
      token: cookies.get('loginToken'),
    };
    try {
      const response = await fetch(
        'http://localhost:8080/api/creditCard/addCreditCard',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creditCard),
        }
      );
      if (response.status === 201) {
        onAdd();
        onCollapse();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during add Credit card.');
    }
  };
  return (
    <>
      <InputText
        inputName={'Credit card number'}
        placeholder={'xxxx xxxx xxxx xxxx'}
        value={cardNumber}
        setValue={setCardNumber}
      />
      <InputText
        inputName={'Credit card holder'}
        placeholder={'Holder name'}
        value={holderName}
        setValue={setHolderName}
      />
      <div className={'form-group'}>
        <div style={{ width: '50%' }}>
          <InputText
            inputName={'Expiration date'}
            placeholder={'mm/yy'}
            value={expirationDate}
            setValue={setExpirationDate}
          />
        </div>
        <div style={{ width: '50%' }}>
          <InputText
            inputName={'CVV'}
            placeholder={'xxx'}
            value={cvv}
            setValue={setCvv}
          />
        </div>
      </div>
      <div className={'add-new__button'}>
        <div
          className={'form-button checkout-page__button--style-1'}
          onClick={onCollapse}
        >
          Cancel
        </div>
        <div
          className={
            isAllowAdd()
              ? 'form-button checkout-page__button--style-3'
              : 'form-button checkout-page__button--style-2'
          }
          onClick={handleAddCreditCard}
        >
          Add
        </div>
      </div>
    </>
  );
}

export default CreditCardForm;
