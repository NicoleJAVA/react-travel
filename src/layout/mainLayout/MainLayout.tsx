import React from "react";
import styles from "./MainLayout.module.scss";
import theme from "../../Theme.module.scss";
import { Header, Footer, Navbar } from "../../components";

interface PropsType {
  children: React.ReactNode;
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div className={styles["content-box"]}>{children}</div>
      <Footer />
    </>
  );
};
