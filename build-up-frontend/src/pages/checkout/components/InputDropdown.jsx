import '../../../scss/checkout/input.scss';
function InputDropdown({
  inputName,
  listItem,
  selectedItem,
  onSelect = () => {},
}) {
  return (
    <div className={'input-container'}>
      <div className={'input-label'}>{inputName}</div>
      <div className="dropdown">
        <button
          className="input-dropdown"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {selectedItem}
            <div className={'dropdown-toggle'}></div>
          </div>
        </button>
        <ul
          className="country-dropdown-menu dropdown-menu"
          style={{ width: '0px' }}
        >
          {listItem.length > 0 ? (
            listItem.map((item, i) => (
              <li key={i} onClick={() => onSelect(item)}>
                <div className={'entry'}>{item.name}</div>
              </li>
            ))
          ) : (
            <li>
              <div className={'no-item'}>No item...</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InputDropdown;
