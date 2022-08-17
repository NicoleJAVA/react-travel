import React from "react";
import styles from "./ShoppingCart.module.scss";
import theme from "../../Theme.module.scss";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";

export const ShoppingCart: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        {/* shopping cart item list */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {/* <ProductList /> */}
          </div>
        </Col>
        {/* payment */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
