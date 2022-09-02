import React from "react";
import styles from "./PlaceOrder.module.scss";
import theme from "../../Theme.module.scss";
import { PaymentForm, CheckoutCard } from "../../components";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col } from "antd";

export const PlaceOrder: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>{/* <CheckoutCard /> */}</Col>
      </Row>
    </MainLayout>
  );
};
