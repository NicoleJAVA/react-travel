import React from "react";
import styles from "./ProductCollection.module.scss";
import theme from "../../Theme.module.scss";
import { Row, Col, Spin, Divider, } from "antd";
import { ProductImage } from "./ProductImage";
import { API_SOURCE, UDEMY } from '../../helpers/constants';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { addToCart } from '../../redux/shoppingCart/slice';
interface PropsType {
  title: JSX.Element;
  sideImage: string;
  products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({
  // title,
  sideImage,
  products,
}) => {
  const isUdemy = API_SOURCE === UDEMY;
  const loading = useSelector((s) => s.shoppingCart.loading);
  const dispatch = useAppDispatch();
  const imgStyle = { "--w": 276, "--h": 230 } as React.CSSProperties;

  const onAddToCart = (product) => {
    dispatch(addToCart({ productId: product.id }));
  }

  return (
    <div className={styles["content"]}>
      <Spin spinning={loading}>
        <Row>
          <Col span={24}>
            {/* the first row */}
            {<Row>
              {
                products.map((product, i) => (
                    <div key={`product-${i}`} className={styles["product-card"]} >
                      <div className={theme["ratio-wrap"]} style={imgStyle}>

                        <img className={`${theme["ratio"]} ${styles[""]}`}
                          src={isUdemy ? products[i].touristRoutePictures[0].url : products[i].imageUrl} />
                      </div>
                      <div>
                        <h3
                          className={`${theme["break-line-2"]} ${styles["product-title"]}`}

                        >
                          {products[i].title}
                        </h3>
                      </div >
                      <div className={`${styles["price-container"]}`}>
                        <span className={`${theme["text-theme"]}`}>NTD</span>
                        <span className={`${styles["product-price"]}`}>$ {products[i].price}</span>
                        <span className={`${theme["text-delete"]}`}>NTD $ {products[i].origin_price}</span>
                      </div>
                      <div className={`${styles["buttons-container"]}`}>
                        <div className={`${theme["btn-icon"]} ${styles["product-btn"]}`}
                          onClick={() => onAddToCart(products[i])}
                        >
                          <ShoppingCartOutlined />
                          {/* <i class="bi bi-cart "></i> */}
                        </div>
                        <div className={`${theme["btn-icon"]} ${styles["product-btn"]}`} >
                          <HeartOutlined />
                          {/* <i className="bi bi-heart"></i> */}
                        </div>
                        <div className={`${theme["btn-icon"]} ${styles["product-btn"]}`} >
                          <ShareAltOutlined />
                          {/* <i className="bi bi-share"></i> */}
                        </div>
                      </div>
                    </div>
                ))
              }

            </Row>}
          </Col>
        </Row >
      </Spin>
    </div >
  );
};
