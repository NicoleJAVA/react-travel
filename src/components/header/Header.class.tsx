import React from "react";
import styles from "./Header.module.scss";
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouterComponentProps } from "../../helpers/withRouter";

class HeaderComponent extends React.Component<RouterComponentProps> {
  render(): React.ReactNode {
    const { navigate } = this.props;

    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles["top-header-box"]}>
            {/* <Typography.Text>櫻花散冊</Typography.Text> */}
            <Space>
              <Dropdown.Button
                overlay={
                  <Menu>
                    <Menu.Item>中文</Menu.Item>
                    <Menu.Item>English</Menu.Item>
                  </Menu>
                }
                icon={<GlobalOutlined />}
              >
                切換語言
              </Dropdown.Button>
              <Button.Group>
                <Space>
                  <Button onClick={() => navigate("/login")}>登入</Button>
                  <Button onClick={() => navigate("/register")}>註冊</Button>
                </Space>
              </Button.Group>
            </Space>
          </div>
        </div>
        {/* main header */}
        <div className={styles["main-header-box"]}>
          <div className={styles["main-header"]}>
            <Typography.Title
              level={3}
              className={styles["title"]}
              onClick={() => navigate("/")}
            >
              櫻花旅遊網
            </Typography.Title>
            <Input.Search
              className={styles["search-input"]}
              placeholder="請輸入旅遊目的地、主題、或關鍵字"
            />
          </div>
        </div>
        {/* menu */}
        <div className={styles["menu-container"]}>
          <Menu mode={"horizontal"} className={styles["main-menu"]}>
            <Menu.Item key={1}>旅遊首頁</Menu.Item>
            <Menu.Item key={2}>週末遊</Menu.Item>
            <Menu.Item key={3}>跟团遊</Menu.Item>
            <Menu.Item key={4}> 自由行 </Menu.Item>
            <Menu.Item key={5}> 私家团 </Menu.Item>
            <Menu.Item key={6}> 邮轮 </Menu.Item>
            <Menu.Item key={7}> 酒店+景点 </Menu.Item>
            <Menu.Item key={8}> 当地玩乐 </Menu.Item>
            <Menu.Item key={9}> 主题游 </Menu.Item>
            <Menu.Item key={10}> 定制游 </Menu.Item>
            <Menu.Item key={11}> 游学 </Menu.Item>
            <Menu.Item key={12}> 签证 </Menu.Item>
            <Menu.Item key={13}> 企业游 </Menu.Item>
            <Menu.Item key={14}> 高端游 </Menu.Item>
            <Menu.Item key={15}> 爱玩户外 </Menu.Item>
            <Menu.Item key={16}> 保险 </Menu.Item>
          </Menu>
        </div>
        {/* footer */}
      </div>
    );
  }
}

export const Header = withRouter(HeaderComponent);
