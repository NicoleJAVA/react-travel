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
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchRecommendProductStartActionCreator,
  fetchRecommendProductSuccessActionCreator,
  fetchRecommendProductFailActionCreator,
} from "../../redux/recommendProduct/recommendProductActions";

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProduct.loading,
    productList: state.recommendProduct.productList,
    error: state.recommendProduct.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStart: () => {
      dispatch(fetchRecommendProductStartActionCreator());
    },

    fetchSuccess: (data) => {
      dispatch(fetchRecommendProductSuccessActionCreator(data));
    },

    fetchFail: (error) => {
      dispatch(fetchRecommendProductFailActionCreator(error));
    },
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
  async componentDidMount() {
    this.props.fetchStart();
    try {
      const { data } = await axios.get(
        "http://123.56.149.216:8089/api/productCollections"
      );
      this.props.fetchSuccess(data);
    } catch (err) {
      if (err instanceof Error) {
        this.props.fetchFail(err.message);
      }
    }
  }

  render() {
    const { t, productList, loading, error } = this.props;

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

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent)); // 第一個小括號是命名空間
