import React from "react";
import { Image, Typography } from "antd";
import theme from "../../Theme.module.scss";
import { Link } from "react-router-dom";

interface PropsType {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price: string | number;
  title: string;
}

export const ProductImage: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
}) => {
  return (
    <Link to={`/detail/${id}`}>
      {size === "large" ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text className={theme["text-theme"]} strong>
          {title.slice(0, 25)}
        </Typography.Text>
        <Typography.Text type="secondary">$ {price} 起</Typography.Text>
      </div>
    </Link>
  );
};
