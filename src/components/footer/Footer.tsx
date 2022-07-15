import React from "react";
import styles from "./Footer.module.scss";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout.Footer className={styles["footer"]}>
      <div>{t("footer.detail")}</div>
    </Layout.Footer>
  );
};
