import React from "react";
import styles from "./PlaceOrder.module.scss";
import theme from "../../Theme.module.scss";
import { PaymentForm, CheckoutCard } from "../../components";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrder: React.FC = (props) => {
  const jwt = useSelector((s) => s.user.token);
  const loading = useSelector((s) => s.order.loading);
  const order = useSelector((s) => s.order.currentOrder);
  const dispatch = useAppDispatch();

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckoutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
