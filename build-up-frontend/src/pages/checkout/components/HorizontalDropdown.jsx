function HorizontalDropdown({
  inputName,
  selectList,
  selectItem,
  onClick = () => {},
}) {
  return (
    <div className={'horizontal-dropdown'}>
      <div className={'horizontal-dropdown__text'}>{inputName}</div>
      <div>
        <div className="dropdown">
          <button
            className="horizontal-dropdown__button dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectItem}
          </button>
          <ul className="dropdown-menu">
            {selectList.map((choice) => (
              <li>
                <div
                  className="horizontal-dropdown__item"
                  onClick={() => onClick(choice)}
                >
                  {choice}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HorizontalDropdown;
