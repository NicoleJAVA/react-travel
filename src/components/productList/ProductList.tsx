import React from "react";
import themeColors from "../../scss/helpers/themeColor.module.scss";
import theme from "../../Theme.module.scss";
import { Link } from "react-router-dom";
import { List, Rate, Space, Image, Tag, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Product {
  departureCity: string;
  description: string;
  discountPresent: number;
  id: string;
  originalPrice: number;
  price: number;
  rating: number;
  title: string;
  touristRoutePictures: any[];
  travelDays: string;
  tripType: string;
}
interface PropsType {
  data: Product[];
  paging?: any;
  onPageChange?: (nextPage, pageSize) => void;
}

const listData = (productList: Product[]) =>
  productList.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    tags: (
      <>
        {p.departureCity && (
          <Tag color={themeColors["purple-100"]}>{p.departureCity} 出發</Tag>
        )}
        {p.travelDays && (
          <Tag color={themeColors["purple-200"]}>{p.travelDays} 天 </Tag>
        )}
        {p.discountPresent && <Tag color={themeColors["purple"]}>超低折扣</Tag>}
        {p.tripType && (
          <Tag color={themeColors["purple-300"]}>{p.tripType}</Tag>
        )}
      </>
    ),
    imgSrc: p.touristRoutePictures[0].url,
    price: p.price,
    originalPrice: p.originalPrice,
    discountPresent: p.discountPresent,
    rating: p.rating,
  }));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ProductList: React.FC<PropsType> = ({
  data,
  paging,
  onPageChange,
}) => {
  const products = listData(data);

  console.log("測試: ", themeColors["extra-dark-gray"]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={
        paging
          ? {
              current: paging.currentPage,
              onChange: (page) =>
                onPageChange && onPageChange(page, paging.pageSize),
              pageSize: paging.pageSize,
              total: paging.totalCount,
            }
          : false
      }
      dataSource={products}
      footer={
        paging && (
          <div>
            搜索總路線: <Text strong>{paging.totalCount}</Text> 條
          </div>
        )
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <>
              {/* <Rate defaultValue={3} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text> */}
            </>,
          ]}
          extra={
            <Image width={272} height={172} alt="image" src={item.imgSrc} />
          }
        >
          <List.Item.Meta
            title={
              <>
                {item.discountPresent ? (
                  <>
                    <span className={theme["text-delete"]}>
                      $ {item.originalPrice}
                    </span>
                    <span className={theme["text-theme-md"]}>
                      {" "}
                      $ {item.price}
                    </span>
                  </>
                ) : (
                  <span className={theme["text-theme-md"]}>$ {item.price}</span>
                )}
                <Link to={"/detail/" + item.id}>
                  {" "}
                  <span className={theme["text-content"]}> {item.title} </span>
                </Link>
              </>
            }
            description={item.tags}
          />
          <span className={theme["text-content"]}> {item.description} </span>
        </List.Item>
      )}
    />
  );
};
