import React from "react";
import styles from "./Header.module.scss";
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouterComponentProps } from "../../helpers/withRouter";
import store from "../../redux/store";
import { LanguageState } from "../../redux/languageReducer";

interface State extends LanguageState {}

class HeaderComponent extends React.Component<RouterComponentProps, State> {
  constructor(props) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    const storeState = store.getState();
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    });
  };

  menuClickHandler = (e) => {
    if (e.key === "new") {
      const action = {
        type: "add_language",
        payload: { code: "some_new_lang", name: "某個新語言" },
      };
      store.dispatch(action);
    } else {
      const action = {
        type: "change_language",
        payload: e.key,
      };
      store.dispatch(action);
    }
  };

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
                  <Menu
                    onClick={this.menuClickHandler}
                    items={[
                      ...this.state.languageList.map((language) => {
                        return { key: language.code, label: language.name };
                      }),
                      { key: "new", label: "添加新語言" },
                    ]}
                  ></Menu>
                }
                icon={<GlobalOutlined />}
              >
                {this.state.language === "zh" ? "中文" : "English"}
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
