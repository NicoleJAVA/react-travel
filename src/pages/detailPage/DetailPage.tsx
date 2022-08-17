import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, DatePicker, Divider, Anchor, Menu } from "antd";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./DetailPage.module.scss";
import theme from "../../Theme.module.scss";
import { Header, Footer, ProductIntro, ProductReviews } from "../../components";
import { reviewsMockData } from "./mockup";
import {
  productDetailSlice,
  getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layout/mainLayout";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

type MatchParams = {
  touristRouteId: string;
};

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<MatchParams>();
  let params = useParams<"touristRouteId">();

  // 以下是使用 react toolkit 以前的寫法
  // const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);

  // 以下是使用 react toolkit 以後的寫法
  const loading = useSelector((state) => state.productDetail.loading);
  const product = useSelector((state) => state.productDetail.data);
  const error = useSelector((state) => state.productDetail.error);
  const dispatch = useAppDispatch();

  // get data from store:
  const jwt = useSelector((s) => s.user.token);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);
  useEffect(() => {
    if (touristRouteId) {
      dispatch(getProductDetail(touristRouteId));
    }
  }, []);

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

  return (
    <MainLayout>
      {/* product introduction and date selection */}
      <div className={styles["product-intro-container"]}>
        <Row>
          {/* product detail */}
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.discount}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((img) => img.url)}
            />
          </Col>
          {/* date selection */}
          <Col span={11}>
            <div className={styles["shopping-cart-btn-container"]}>
              <Button
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  dispatch(
                    addShoppingCartItem({ jwt, touristRouteId: product.id })
                  );
                }}
              >
                <ShoppingCartOutlined />
                加入購物車
              </Button>
            </div>
            <RangePicker open className={styles["range-picker"]} />
          </Col>
        </Row>
      </div>
      {/* menu anchor */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key="menu-features">
            <Anchor.Link href="#features" title="產品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="menu-fees">
            <Anchor.Link href="#fees" title="產品費用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="menu-booking-notes">
            <Anchor.Link href="#booking-notes" title="預定須知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="menu-reviews">
            <Anchor.Link href="#reviews" title="旅客評價"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* product features */}
      <div id="features" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <div className={theme["text-main-title"]}>產品特色</div>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          className={styles["product-subsection"]}
        ></div>
      </div>
      {/* product fees */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <div className={theme["text-main-title"]}>產品費用</div>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          className={styles["product-subsection"]}
        ></div>
      </div>
      {/* booking notes */}
      <div id="booking-notes" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <div className={theme["text-main-title"]}>預定須知</div>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          className={styles["product-subsection"]}
        ></div>
      </div>
      {/* customer reviews */}
      <div id="reviews" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <div className={theme["text-main-title"]}>旅客評價</div>
        </Divider>
        <div className={styles["customer-reviews-content"]}>
          <ProductReviews data={reviewsMockData} />
        </div>
      </div>
    </MainLayout>
  );
};
