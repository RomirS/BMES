import React, { useRef } from 'react';
import M from 'materialize-css';

const Dropdown = ({ title, data, dataTarget, onClick }) => {
  const dropdownEl = useRef(null);
  useRef(M.Dropdown.init(dropdownEl.current));

  return (
    <>
    <a className='calendar-label dropdown-trigger btn' href='#!' data-target={dataTarget} ref={dropdownEl}>
      {title}
      <i className="material-icons grey-text text-darken-2">keyboard_arrow_down</i>
    </a>
    <ul id={dataTarget} className='dropdown-content'>
      {data.map((value, i) => (
        <li
          key={value + i}
          className="calendar-month"
          onClick={() => onClick(value, i)}
        >
          <a href="#!" className="black-text">{value}</a>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Dropdown;