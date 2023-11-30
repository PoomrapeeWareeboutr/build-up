import '../../../scss/checkout/input.scss';
function InputText({ inputName, placeholder, value, setValue = () => {} }) {
  return (
    <div className={'input-container'}>
      <div className={'input-label'}>{inputName}</div>
      <div className={'input-text'}>
        <input
          style={{ all: 'unset', width: '100%' }}
          type={'text'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default InputText;
