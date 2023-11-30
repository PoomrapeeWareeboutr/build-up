import '../../../scss/checkout/checkout.scss';
import '../../../scss/checkout/checkout_form.scss';
import InputText from './InputText';
import InputDropdown from './InputDropdown';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ShippingAddressSelectionContext } from '../../../data/context';
import Cookies from 'universal-cookie';

function CheckoutAddressForm() {
  const [isExpandMode, setIsExpandMode] = useState(false);
  const baseUrl = 'http://localhost:8080';

  const [selectedAddress, setSelectedAddress] = useContext(
    ShippingAddressSelectionContext
  );

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const token = { token: new Cookies().get('loginToken') };
        const res = await fetch(
          `${baseUrl}/api/shippingAddress/findShippingAddressByToken`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token),
          }
        );
        const data = await res.json();
        setAddresses(data.data ?? []);
      } catch (e) {
        setAddresses([]);
      }
    };

    fetchCreditCards();
  }, []);

  const decorateAddressText = (address) => {
    return `${address.detail}, ${address.subDistrict}, ${address.district}, ${address.province}, ${address.postcode}, ${address.country}`;
  };

  const allAddresses = useMemo(() => {
    return addresses.map((address) => ({
      ...address,
      name: decorateAddressText(address),
    }));
  }, [addresses]);

  const toggleExpandMode = () => {
    setIsExpandMode(!isExpandMode);
  };

  const clickCancelButton = () => {
    setIsExpandMode(!isExpandMode);
  };

  const AddressForm = () => {
    return (
      <>
        <div className={'border-top'} style={{ paddingTop: '16px' }}>
          <InputText
            inputName={'Name'}
            placeholder={'Enter surname and lastname'}
          />
        </div>
        <div>
          <InputText inputName={'Phone number'} placeholder={'placeholder'} />
        </div>
        <InputDropdown
          inputName={'Country'}
          listItem={['Thailand', 'Singapore', 'Malaysia']}
          selectedItem={'Thailand'}
        />
        <InputText
          inputName={'Address information'}
          placeholder={'Enter house no., building, street'}
        />
        <InputText
          inputName={'Province, District, Sub-district'}
          placeholder={'Enter province, district, sub-district'}
        />
        <InputText inputName={'Postcode'} placeholder={'Enter postcode'} />
      </>
    );
  };

  return (
    <>
      <div className={'form-container'}>
        <InputDropdown
          inputName={'Your address'}
          listItem={allAddresses}
          selectedItem={selectedAddress ? selectedAddress.name : 'Select'}
          onSelect={setSelectedAddress}
        />
        <div className={'add-new'} onClick={toggleExpandMode}>
          + Add your new address
        </div>
        {isExpandMode && AddressForm()}
        {isExpandMode && (
          <div className={'add-new__button'}>
            <div
              className={'form-button checkout-page__button--style-1'}
              onClick={clickCancelButton}
            >
              Cancel
            </div>
            <div className={'form-button checkout-page__button--style-2'}>
              Add
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckoutAddressForm;
