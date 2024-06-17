import React, { useEffect, createContext, useContext, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import ToastMessages from '../components/ToastMessages';  // todo stday
// import emitter from '../methods/emitter'; // todo stday
// import { isApiSuccess } from '../methods/isApiSuccess'; // todo stday
import { OrdersPage } from '../../pages/ordersPage';
import { AdminNavbar } from '../../components/adminNavbar/AdminNavbar';

// const EmitterContext = createContext(emitter); // todo stday

// export const useEmitter = () => useContext(EmitterContext); // todo stday

export const AdminLayout: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)sellerToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    axios.defaults.headers.common.Authorization = token;
    const api = `${process.env.REACT_APP_API}/api/user/check`;

    axios.post(api).then(response => { // todo stday
      // if (!isApiSuccess(response, api)) {
      //   navigate('/login');
      // }
    });
  }, [navigate]);

  return (
    // <EmitterContext.Provider value={emitter}>  // todo stday
    <div>

      <AdminNavbar />
      <div className="container-fluid">
        {/* <ToastMessages />  // todo stday */}
        <Routes>
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </div>
    // </EmitterContext.Provider>
  );
};
