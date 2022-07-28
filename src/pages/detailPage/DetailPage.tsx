import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, DatePicker, Space } from "antd";
import styles from "./DetailPage.module.scss";
import { Header, Footer, ProductIntro } from "../../components";

const { RangePicker } = DatePicker;

type MatchParams = {
  touristRouteId: string;
};

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<MatchParams>();
  let params = useParams<"touristRouteId">();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error instanceof Error ? error.message : "error");
      }
    };
    fetchData();
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
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* product introduction and date selection */}
        <div className={styles["product-intro-container"]}>
          <Row>
            {/* product detail */}
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.descirption}
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
              <RangePicker open className={styles["range-picker"]} />
            </Col>
          </Row>
        </div>
        {/* menu anchor */}
        <div className={styles["product-detail-anchor"]}></div>
        {/* product features */}
        <div id="feature" className={styles["product-detail-container"]}></div>
        {/* product fees */}
        <div id="fees" className={styles["product-detail-container"]}></div>
        {/* booking notes */}
        <div
          id="booking-notes"
          className={styles["product-detail-container"]}
        ></div>
        {/* customer reviews */}
        <div id="reviews" className={styles["product-detail-container"]}></div>
      </div>
      <Footer />
    </>
  );
};
