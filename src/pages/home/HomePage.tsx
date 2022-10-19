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
    categoryList: state.recommendProduct.categoryList, // todo
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
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData();
  }

  render() {
    const { t, allProducts, cateProducts, categoryList, loading, error } = this.props;
    // console.log("列印對照表", categoryList);//  todo
    console.log("列印分類過產品表", cateProducts);//  todo
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

    let currProductList;
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
      currProductList = allProducts;
    }

    const showCategory = (categoryKey) => {

      currProductList = cateProducts.find(x => x.category === categoryKey);
      console.log("\n 點擊類別, ", categoryKey, currProductList)// todo

    }

    const test = () => {
      // This has nothing to do with react, it's simply that on the inside 
      // array is still an instance of an object and can have it's properties 
      // modified the same way, without actually adding them to the iterable options.


      console.log("TEST", cateProducts, Array.isArray(cateProducts), cateProducts['stb'], cateProducts.length); // todo
    }

    return (
      <MainLayout>
        <Row className={styles["row"]}>
          <Col span={6}>
            <ul>
              <a onClick={() => { test() }}>點擊測試</a>
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
          products={currProductList}
        />
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
