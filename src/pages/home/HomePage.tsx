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
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import {
  giveMeDataActionCreator,
  ChangeCategoryActionCreator
} from "../../redux/recommendProduct/recommendProductActions";
import { MainLayout } from "../../layout/mainLayout";
import { API_SOURCE, UDEMY } from "../../helpers/constants";
import categoryName from "../../assets/strings/category-zh_tw.json"

const isUdemy = API_SOURCE === UDEMY;

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProduct.loading,
    allProducts: state.recommendProduct.allProducts,
    categoryList: state.recommendProduct.categoryList,
    cateProducts: state.recommendProduct.cateProducts,
    currProducts: state.recommendProduct.currProducts,
    error: state.recommendProduct.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    },
    changeCategory: (categoryKey) => {
      dispatch(ChangeCategoryActionCreator(categoryKey));
    }
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
// interface IProps {
//   currProducts: any[];
// }

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData();
  }


  render() {
    const { t, allProducts, cateProducts, currProducts, categoryList, loading, error } = this.props;
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
    }

    const showCategory = (categoryKey) => {
      this.props.changeCategory(categoryKey);
    }


    return (
      <MainLayout>
        <Row className={styles["row"]}>
          <Col span={6}>

            <div className={`${styles["categry-tab"]}`}><b>商品類別</b></div>
            {categoryList && categoryList.map((item, i) => {
              return <div key={i} className={`${styles["categry-tab"]}`} >
                <a href="#" onClick={() => showCategory(item)}
                  className={`${theme["link-transition"]} ${styles[""]}`}>
                  {categoryName[item]}
                </a>
              </div>
            })}

          </Col>
          <Col span={18}>
            {/* <Carousel /> */}
          </Col>
        </Row>
        {currProducts && <ProductCollection
          title={
            <></>
            // <Typography.Title level={3} className={theme["text-theme"]}>
            //   {t("home_page.hot_recommended")}
            // </Typography.Title>
          }
          sideImage={suggestProductImg}
          products={currProducts}
        />}
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
