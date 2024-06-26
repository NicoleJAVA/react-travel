import React, { useEffect } from "react";
import styles from "./App.module.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  DetailPage,
  SearchPage,
  ShoppingCart,
  PlaceOrder,
} from "./pages";
import { Navigate } from "react-router-dom";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice";
import { UserForm } from "./pages/userForm/UserForm";
import { CheckoutPage } from "./pages/checkoutPage/CheckoutPage";
import { AdminLayout } from "./layout/adminLayout/AdminLayout";
import { OrdersPage } from "./pages/ordersPage";

const PrivateRoute = ({ children }) => {
  const jwt = useSelector((state) => state.user.token);

  return jwt ? children : <Navigate to="/login" />;
};

function App() {
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (jwt) {
  //     dispatch(getShoppingCart(jwt));
  //   }
  // }, [jwt]);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/userForm" element={<UserForm />} />
          <Route path="/checkout/:orderId" element={<CheckoutPage />} />
          <Route path="/dashboard/*" element={<AdminLayout />} />
          {/* <Route path="/dashboard/orders" element={<OrdersPage />} /> */}
          <Route
            path="/shoppingCart"
            element={
              // <PrivateRoute>
              <ShoppingCart />
              // </PrivateRoute>
            }
          />
          <Route
            path="/placeOrder"
            element={
              <PrivateRoute>
                <PlaceOrder />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
