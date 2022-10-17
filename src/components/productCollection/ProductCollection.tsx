import React from "react";
import styles from "./ProductCollection.module.scss";
import { Row, Col, Typography, Divider } from "antd";
import { ProductImage } from "./ProductImage";
import { API_SOURCE, UDEMY } from '../../helpers/constants';
interface PropsType {
  title: JSX.Element;
  sideImage: string;
  products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({
  title,
  sideImage,
  products,
}) => {
  const isUdemy = API_SOURCE === UDEMY;

  return (
    <div className={styles["content"]}>
      <Divider orientation="left">{title}</Divider>
      <Row>
        <Col span={4}>
          <img
            src={sideImage}
            alt="side image"
            className={styles["side-image"]}
          />
        </Col>
        <Col span={20}>
          {/* the first row */}
          {<Row>
            {
              [0, 1, 2].map((product, i) => (
                <Col span={12}>
                  <ProductImage
                    id={products[i].id}
                    size="small"
                    title={products[i].title}
                    // imageSrc={products[i].imageUrl}
                    imageSrc={isUdemy ? products[i].touristRoutePictures[0].url : products[i].imageUrl}
                    price={products[i].price}
                  />
                </Col>
              ))
            }

          </Row>}
          {/* the second row */}
          {
            [0, 1, 2].map((product, i) => (
              <Col span={12}>
                <ProductImage
                  id={products[i + 3].id}
                  size="small"
                  title={products[i + 3].title}
                  imageSrc={isUdemy ? products[i + 3].touristRoutePictures[0].url : products[i].imageUrl}
                  // imageSrc={products[i + 3].imageUrl}
                  price={products[i + 3].price}
                />
              </Col>
            ))
          }
        </Col>
      </Row>
    </div>
  );
};