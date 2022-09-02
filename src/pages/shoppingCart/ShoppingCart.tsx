import React from "react";
import styles from "./ShoppingCart.module.scss";
import theme from "../../Theme.module.scss";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import {
  deleteShoppingCartItems,
  checkout,
} from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";

export const ShoppingCart: React.FC = () => {
  const loading = useSelector((s) => s.shoppingCart.loading);
  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Row>
        {/* shopping cart item list */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>
        {/* payment */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) return;

                  dispatch(checkout(jwt));
                  navigate("/placeOrder");
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    deleteShoppingCartItems({
                      jwt,
                      itemIds: shoppingCartItems.map((s) => s.id),
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
