import styles from "./ProductIntro.module.scss";
import React from "react";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface PropsType {
  title: string;
  shortDescription: string;
  price: string | number;
  coupons: string;
  points: string;
  discount: string;
  rating: string | number;
  pictures: string[];
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];
interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

export const ProductIntro: React.FC<PropsType> = ({
  title,
  shortDescription,
  price,
  coupons,
  points,
  discount,
  rating,
  pictures,
}) => {
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路線名稱",
      description: title,
    },
    {
      key: 1,
      title: "價格",
      description: (
        <>
          ${" "}
          <Typography.Text type="danger" strong>
            {price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: "限時搶購折扣",
      description: discount ? (
        <>
          $ <Typography.Text delete>{price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            $ {discount}
          </Typography.Text>
        </>
      ) : (
        "暫無折扣"
      ),
    },
    {
      key: 2,
      title: "領取優惠",
      description: coupons ? discount : "無優惠券可領",
    },
    {
      key: 2,
      title: "路線評價",
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} 星
          </Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles["intro-container"]}>
      <span className={styles["text-theme text-main-title"]}>{title}</span>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles["intro-detail-content"]}>
        <div className={styles["text-content"]}>
          $ <span className={styles["intro-detail-strong-text"]}>{price}</span>
        </div>
        <div className={styles["text-content"]}>
          ${" "}
          <span className={styles["intro-detail-strong-text rating"]}>
            {rating}
          </span>
        </div>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((img) => (
          <Image className={styles["carousel-img"]} src={img} />
        ))}
      </Carousel>
      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
      />
    </div>
  );
};
