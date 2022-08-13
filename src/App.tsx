import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  DetailPage,
  SearchPage,
  ShoppingCart,
} from "./pages";
import { Navigate } from "react-router-dom";
import { useSelector } from "./redux/hooks";

const PrivateRoute = ({ children }) => {
  const jwt = useSelector((state) => state.user.token);

  return jwt ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
