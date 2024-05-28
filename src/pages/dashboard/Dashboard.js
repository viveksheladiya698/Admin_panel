import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from '../header/Header';
import './Dashboard.css'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  let [isOpen, setisOpen] = useState(true);
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 769) {
      setisOpen(false);
    } else if (width < 769) {
      setisOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the correct state based on the current window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="bx overflow-x-hidden">
        <div className="box d-flex w-100">
          <div className={`side-bar ${isOpen ? 'max-width' : 'min-width'}`}>
            <Sidebar open={isOpen} />
          </div>
          <div className="header w-100">
            <Header setopen={setisOpen} open={isOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard