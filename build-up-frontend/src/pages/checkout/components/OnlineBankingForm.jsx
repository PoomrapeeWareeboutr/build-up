import '../../../scss/checkout/checkout.scss';
import '../../../scss/checkout/checkout_form.scss';
import HorizontalDropdown from './HorizontalDropdown';
import InputText from './InputText';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
function OnlineBankingForm({ onCollapse, onAdd }) {
  const cookies = new Cookies();

  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [holderName, setHolderName] = useState('');

  const isAllowAdd = () => {
    return (
      bankName && bankAccountNumber && holderName && cookies.get('loginToken')
    );
  };

  const onChangeBank = (bankName) => {
    setBankName(bankName);
  };

  const handleAddOnlineBank = async (e) => {
    e.preventDefault();

    if (!isAllowAdd()) {
      return;
    }

    const bankAccount = {
      bankName,
      holderName,
      bankAccountNumber,
      token: cookies.get('loginToken'),
    };

    try {
      const response = await fetch(
        'http://localhost:8080/api/bankAccount/addBankAccount',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bankAccount),
        }
      );
      if (response.status === 201) {
        onAdd();
        onCollapse();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HorizontalDropdown
        inputName={'Select bank'}
        selectList={['SCB', 'Krungthai']}
        selectItem={bankName || 'Select'}
        onClick={onChangeBank}
      />
      <InputText
        inputName={'Holder name'}
        placeholder={'Enter name'}
        value={holderName}
        setValue={setHolderName}
      />
      <InputText
        inputName={'Bank account number'}
        placeholder={'xxxx-xxxx'}
        value={bankAccountNumber}
        setValue={setBankAccountNumber}
      />
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
          onClick={handleAddOnlineBank}
        >
          Add
        </div>
      </div>
    </>
  );
}

export default OnlineBankingForm;
