import '../../../scss/checkout/checkout.scss';
import '../../../scss/checkout/checkout_form.scss';
import HorizontalDropdown from './HorizontalDropdown';
import CreditCardForm from './CreditCardForm';
import OnlineBankingForm from './OnlineBankingForm';
import { useContext, useEffect, useState } from 'react';
import InputDropdown from './InputDropdown';
import Cookies from 'universal-cookie';
import { useMemo } from 'react';
import { PaymentSelectionContext } from '../../../data/context';

function PaymentMethodForm() {
  const [paymentMethod, setPaymentMethod] = useState('Credit card');
  const baseUrl = 'http://localhost:8080';

  const [selectedPayment, setSelectedPayment] = useContext(
    PaymentSelectionContext
  );

  const [creditCards, setCreditCards] = useState([]);
  const [onlineBanks, setOnlineBanks] = useState([]);

  const [isExpandMode, setIsExpandMode] = useState(false);

  const toggleExpandMode = () => {
    setIsExpandMode(!isExpandMode);
  };

  const clickCancelButton = () => {
    setIsExpandMode(!isExpandMode);
  };

  const changePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const fetchOnlineBanks = async () => {
    try {
      const token = { token: new Cookies().get('loginToken') };
      const res = await fetch(
        `${baseUrl}/api/bankAccount/findBankAccountByToken`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(token),
        }
      );
      const data = await res.json();
      setOnlineBanks(data.data ?? []);
    } catch (e) {
      setOnlineBanks([]);
    }
  };

  const fetchCreditCards = async () => {
    try {
      const token = { token: new Cookies().get('loginToken') };
      const res = await fetch(
        `${baseUrl}/api/creditCard/findCreditCardByToken`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(token),
        }
      );
      const data = await res.json();
      setCreditCards(data.data ?? []);
    } catch (e) {
      setCreditCards([]);
    }
  };

  useEffect(() => {
    fetchCreditCards();
    fetchOnlineBanks();
  }, []);

  const decorateCardDisplayText = (cardNumber) => {
    const startIndex = cardNumber.length - 4;
    const slicedString = cardNumber.substring(startIndex);

    return `Credit card (xxxx-${slicedString})`;
  };

  const decorateOnlineBankDisplayText = (bankNumber, bankName) => {
    const startIndex = bankNumber.length - 4;
    const slicedString = bankNumber.substring(startIndex);

    return `${bankName} (xxxx-${slicedString})`;
  };

  const creditCardMethod = () => {
    return creditCards.map((card) => ({
      ...card,
      name: decorateCardDisplayText(card.cardNumber),
    }));
  };

  const onlineBankingMethod = () => {
    return onlineBanks.map((each) => ({
      ...each,
      name: decorateOnlineBankDisplayText(
        each.bankAccountNumber,
        each.bankName
      ),
    }));
  };

  const allPaymentMethod = useMemo(() => {
    return creditCardMethod().concat(onlineBankingMethod());
  }, [creditCards, onlineBanks]);

  const selectMethod = (method) => {
    setSelectedPayment(method);
  };

  const PaymentForm = () => {
    return (
      <>
        <div className={'border-top'} style={{ paddingTop: '16px' }}>
          <HorizontalDropdown
            inputName={'Select Transaction'}
            selectList={['Credit card', 'Online banking']}
            selectItem={paymentMethod}
            onClick={changePaymentMethod}
          />
        </div>
        {paymentMethod === 'Credit card' ? (
          <CreditCardForm
            onCollapse={clickCancelButton}
            onAdd={fetchCreditCards}
          />
        ) : (
          <OnlineBankingForm
            onCollapse={clickCancelButton}
            onAdd={fetchOnlineBanks}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className={'form-container'}>
        <InputDropdown
          inputName={'Your payment method'}
          listItem={allPaymentMethod}
          selectedItem={selectedPayment ? selectedPayment.name : 'Select'}
          onSelect={selectMethod}
        />
        <div className={'add-new'} onClick={toggleExpandMode}>
          + Add a new payment method
        </div>
        {isExpandMode && PaymentForm()}
      </div>
    </>
  );
}

export default PaymentMethodForm;
