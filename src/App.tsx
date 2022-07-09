import React from "react";
import styles from "./App.module.scss";
import theme from "./Theme.module.scss";
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from "./components";
import { Row, Col, Typography } from "antd";
import { suggestProductList } from "./mockup";
import { newProductList } from "./mockup";
import { domesticProductList } from "./mockup";
import suggestProductImg from "./assets/img/suggest_products.png";
import newProductImg from "./assets/img/new_products.png";
import domesticProductImg from "./assets/img/domestic_products.png";

function App() {
  return (
    <div>
      <Header />
      <div className={styles["content-box"]}>
        <Row className={styles["row"]}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} className={theme["text-theme"]}>
              熱銷推薦
            </Typography.Title>
          }
          sideImage={suggestProductImg}
          products={suggestProductList}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} className={theme["text-theme"]}>
              新品上市
            </Typography.Title>
          }
          sideImage={newProductImg}
          products={newProductList}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} className={theme["text-theme"]}>
              國內旅遊
            </Typography.Title>
          }
          sideImage={domesticProductImg}
          products={domesticProductList}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
