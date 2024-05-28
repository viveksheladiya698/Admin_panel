import React from 'react';
import './component.css'
import { Link } from 'react-router-dom';

const Down = ({ title, content, icon, isOpen, toggleAccordion }) => {
  let sub = content;
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleAccordion}>
        <li><span className='icon me-2'>{icon}</span>{title}</li>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`${isOpen ? 'accordion-content open' : 'accordion-content close'}`}>
        <ul className='sub-menu theme-color'>
          {
            sub != null &&
            sub.map((ele, ind) => {
              return (
                <Link to={ele.path}>
                  <li key={ind} className='ms-3'>
                    <span className='icon ms-1 me-2'>
                      {ele.icon}
                    </span>
                    {ele.name}
                  </li>
                </Link>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Down;
