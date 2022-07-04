import React from "react";
import styles from "./Footer.module.scss";
import { Layout } from "antd";

export const Footer: React.FC = () => {
  return (
    <Layout.Footer className={styles["footer"]}>
      <div>版權所有 櫻花旅遊網</div>
    </Layout.Footer>
  );
};
