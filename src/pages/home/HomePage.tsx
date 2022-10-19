import React from "react";
import theme from "../../Theme.module.scss";
import styles from "./HomePage.module.scss";
import {
  Header,
  Footer,
  // Carousel,
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
import { giveMeDataActionCreator } from "../../redux/recommendProduct/recommendProductActions";
import { MainLayout } from "../../layout/mainLayout";
import { API_SOURCE, UDEMY } from "../../helpers/constants"

const isUdemy = API_SOURCE === UDEMY;

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProduct.loading,
    allProducts: state.recommendProduct.allProducts,
    categoryList: state.recommendProduct.categoryList,
    cateProducts: state.recommendProduct.cateProducts,
    error: state.recommendProduct.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    },
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>
  ;

interface IProps {
  currProducts: any[];
}

class HomePageComponent extends React.Component<PropsType, IProps> {
  constructor(props) {
    super(props);
    this.state = { currProducts: [] };
  }

  componentDidMount() {
    this.props.giveMeData();
  }

  render() {
    const { t, allProducts, cateProducts, categoryList, loading, error } = this.props;
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

    let suggestProductList;
    let newProductList;
    let domesticProductList;
    // -Udemy
    if (API_SOURCE === UDEMY) {
      suggestProductList = allProducts[0].touristRoutes;
      newProductList = allProducts[1].touristRoutes;
      domesticProductList = allProducts[2].touristRoutes;

    } else {
      // -Hexo 
    }

    const showCategory = (categoryKey) => {
      this.setState(
        {
          currProducts:
            cateProducts.find(x => x.category === categoryKey).data
        });
    }

    const test = () => {
    }

    return (
      <MainLayout>
        <Row className={styles["row"]}>
          <Col span={6}>
            <ul>
              商品類別
              {categoryList && categoryList.map((item, i) => {
                return <li key={i}>
                  <a href="#" onClick={() => showCategory(item)}>
                    {item}
                  </a>
                </li>
              })}
            </ul>
          </Col>
          <Col span={18}>
            {/* <Carousel /> */}
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} className={theme["text-theme"]}>
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
          sideImage={suggestProductImg}
          products={this.state.currProducts}
        />
        {/* <a onClick={() => { test() }}>click to test</a> */}
        {isUdemy && <ProductCollection
          title={
            <Typography.Title level={3} className={theme["text-theme"]}>
              {t("home_page.new_arrival")}
            </Typography.Title>
          }
          sideImage={newProductImg}
          products={newProductList}
        />}
        {isUdemy && <ProductCollection
          title={
            <Typography.Title level={3} className={theme["text-theme"]}>
              {t("home_page.domestic_travel")}
            </Typography.Title>
          }
          sideImage={domesticProductImg}
          products={domesticProductList}
        />}
      </MainLayout>
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent)); // 第一個小括號是命名空間
