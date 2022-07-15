import React from "react";
import styles from "./Header.module.scss";
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouterComponentProps } from "../../helpers/withRouter";
import store from "../../redux/store";
import { LanguageState } from "../../redux/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";

interface State extends LanguageState {}

class HeaderComponent extends React.Component<
  RouterComponentProps & WithTranslation,
  State
> {
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
    const { navigate, t } = this.props;

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
                      { key: "new", label: t("header.add_new_language") },
                    ]}
                  ></Menu>
                }
                icon={<GlobalOutlined />}
              >
                {this.state.language === "zh" ? "中文" : "English"}
              </Dropdown.Button>
              <Button.Group>
                <Space>
                  <Button onClick={() => navigate("/login")}>
                    {t("header.register")}
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    {t("header.login")}
                  </Button>
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
              {t("header.title")}
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
            <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
            <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
            <Menu.Item key={3}>{t("header.group")}</Menu.Item>
            <Menu.Item key={4}> {t("header.backpack")} </Menu.Item>
            <Menu.Item key={5}> {t("header.private")} </Menu.Item>
            <Menu.Item key={6}> {t("header.cruise")} </Menu.Item>
            <Menu.Item key={7}> {t("header.hotel")} </Menu.Item>
            <Menu.Item key={8}> {t("header.local")} </Menu.Item>
            <Menu.Item key={9}> {t("header.theme")} </Menu.Item>
            <Menu.Item key={10}> {t("header.custom")} </Menu.Item>
            <Menu.Item key={11}> {t("header.study")} </Menu.Item>
            <Menu.Item key={12}> {t("header.visa")} </Menu.Item>
            <Menu.Item key={13}> {t("header.enterprise")} </Menu.Item>
            <Menu.Item key={14}> {t("header.high_end")} </Menu.Item>
            <Menu.Item key={15}> {t("header.outdoor")} </Menu.Item>
            <Menu.Item key={16}> {t("header.insurance")} </Menu.Item>
          </Menu>
        </div>
        {/* footer */}
      </div>
    );
  }
}

export const Header = withTranslation()(withRouter(HeaderComponent));
