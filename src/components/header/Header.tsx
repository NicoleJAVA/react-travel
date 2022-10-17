import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import theme from "../../Theme.module.scss";
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";
import { API_SOURCE, UDEMY } from '../../helpers/constants';

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const jwt = useSelector((state) => state.user.token);
  const [username, setUsername] = useState("");

  // get shopping cart data from store:
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    if (e.key === "new") {
      dispatch(addLanguageActionCreator("某個新語言", "some_new_lang"));
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const onSearchHandler = (keyword) => {
    if (keyword) {
      navigate("/search/" + keyword);
    }
  };

  const onLogout = () => {
    dispatch(userSlice.actions.logout());
    navigate("/");
    // window.location.reload(false);
  };

  const isUdemy = API_SOURCE === UDEMY;
  const HEXO = !isUdemy;
  let UDEMY_LOGIN = false;
  let UDEMY_NOT_LOGIN = false;
  if (isUdemy) {
    if (jwt) {
      UDEMY_LOGIN = true;
    } else {
      UDEMY_NOT_LOGIN = true;
    }
  }

  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles["top-header-box"]}>
          <Space>
            {jwt && (
              // 雙 class
              <span
                className={`${theme["text-content"]} ${styles["username"]}`}
              >
                {username}
              </span>
            )}
            <Dropdown.Button
              overlay={
                <Menu
                  onClick={menuClickHandler}
                  items={[
                    ...languageList.map((language) => {
                      return { key: language.code, label: language.name };
                    }),
                    { key: "new", label: t("header.add_new_language") },
                  ]}
                ></Menu>
              }
              icon={<GlobalOutlined />}
            >
              {language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            {/* Hexo */}
            {
              HEXO &&
              <Button.Group className={styles["header-button-group"]}>
                <Space>
                  <Button
                    loading={shoppingCartLoading}
                    onClick={() => navigate("/shoppingCart")}
                  >
                    {t("header.shoppingCart")}({shoppingCartItems.length})
                  </Button>
                </Space>
              </Button.Group>
            }
            {/* Udemy, 已登入 */}
            {
              UDEMY_LOGIN &&
              <Button.Group className={styles["header-button-group"]}>
                <Space>
                  <Button
                    loading={shoppingCartLoading}
                    onClick={() => navigate("/shoppingCart")}
                  >
                    {t("header.shoppingCart")}({shoppingCartItems.length})
                  </Button>
                  <Button onClick={onLogout}>{t("header.logout")}</Button>
                </Space>
              </Button.Group>
            }
            {/* Udemy, 未登入 */}
            {
              UDEMY_NOT_LOGIN && <Button.Group className={styles["header-button-group"]}>
                <Space>
                  <Button onClick={() => navigate("/login")}>
                    {t("header.login")}
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    {t("header.register")}
                  </Button>
                </Space>
              </Button.Group>
            }
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
            onSearch={onSearchHandler}
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
    </div >
  );
};
