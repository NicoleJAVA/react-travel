import React from "react";
import styles from "./Header.module.scss";
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouterComponentProps } from "../../helpers/withRouter";
import { RootState } from "../../redux/store";
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from "../../redux/language/languageActions";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  // 要印 log 的話，記得把 index.ts 導出的檔案改成 Header.class

  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },

    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = RouterComponentProps &
  WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>; // Redux 中 dispatch 的映射類型

class HeaderComponent extends React.Component<PropsType> {
  menuClickHandler = (e) => {
    if (e.key === "new") {
      // 要印 log 的話，記得把 index.ts 導出的檔案改成 Header.class
      this.props.addLanguage("某個新語言", "some_new_lang");
    } else {
      this.props.changeLanguage(e.key);
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
                      ...this.props.languageList.map((language) => {
                        return { key: language.code, label: language.name };
                      }),
                      { key: "new", label: t("header.add_new_language") },
                    ]}
                  ></Menu>
                }
                icon={<GlobalOutlined />}
              >
                {this.props.language === "zh" ? "中文" : "English"}
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
              placeholder={t("header.search_placeholder")}
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

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)));
