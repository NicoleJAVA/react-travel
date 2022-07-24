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
import { Row, Col, Typography, Spin } from "antd";
import suggestProductImg from "../../assets/img/suggest_products.png";
import newProductImg from "../../assets/img/new_products.png";
import domesticProductImg from "../../assets/img/domestic_products.png";
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";

interface State {
  loading: boolean;
  error: string | null;
  productList: any[];
}
class HomePageComponent extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      productList: [],
    };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        "http://123.56.149.216:8089/api/productCollections"
      );
      this.setState({
        loading: false,
        error: null,
        productList: data,
      });
    } catch (err) {
      if (err instanceof Error) {
        this.setState({
          error: err.message,
          loading: false,
        });
      }
    }
  }

  render() {
    const { t } = this.props;
    const { productList, loading, error } = this.state;

    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      );
    }

    if (error) {
      return <div>網站發生錯誤： {error}</div>;
    }

    const suggestProductList = productList[0].touristRoutes;
    const newProductList = productList[1].touristRoutes;
    const domesticProductList = productList[2].touristRoutes;

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
