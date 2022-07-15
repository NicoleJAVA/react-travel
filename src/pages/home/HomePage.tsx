import React from "react";
import theme from "../../Theme.module.scss";
import styles from "./HomePage.module.scss";
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from "../../components";
import { Row, Col, Typography } from "antd";
import { suggestProductList } from "./mockup";
import { newProductList } from "./mockup";
import { domesticProductList } from "./mockup";
import suggestProductImg from "../../assets/img/suggest_products.png";
import newProductImg from "../../assets/img/new_products.png";
import domesticProductImg from "../../assets/img/domestic_products.png";
import { withTranslation, WithTranslation } from "react-i18next";
class HomePageComponent extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props;

    return (
      <>
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
                {t("home_page.hot_recommended")}
              </Typography.Title>
            }
            sideImage={suggestProductImg}
            products={suggestProductList}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} className={theme["text-theme"]}>
                {t("home_page.new_arrival")}
              </Typography.Title>
            }
            sideImage={newProductImg}
            products={newProductList}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} className={theme["text-theme"]}>
                {t("home_page.domestic_travel")}
              </Typography.Title>
            }
            sideImage={domesticProductImg}
            products={domesticProductList}
          />
        </div>
        <Footer />
      </>
    );
  }
}

export const HomePage = withTranslation()(HomePageComponent); // 第一個小括號是命名空間
