import React from "react";
import styles from "./App.module.scss";
import { Header, Footer, Carousel, SideMenu } from "./components";
import { Row, Col } from "antd";

function App() {
  return (
    <div>
      <Header />
      <div className={styles["content-box"]}>
        <Row className={styles["row"]}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default App;
