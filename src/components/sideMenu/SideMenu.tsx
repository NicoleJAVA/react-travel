import React from "react";
import styles from "./SideMenu.module.scss";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles["side-menu"]}>
      {sideMenuList.map((menu, index) => (
        <Menu.SubMenu
          key={`side-menu-${index}`}
          title={
            <span>
              <GifOutlined />
              {menu.title}
            </span>
          }
        >
          {menu.subMenu.map((subMenu, subMenuIndex) => (
            <Menu.SubMenu
              key={`sub-menu-${subMenuIndex}`}
              title={
                <span>
                  <GifOutlined />
                  {subMenu.title}
                </span>
              }
            >
              {subMenu.subMenu.map((item, itemIndex) => (
                <Menu.Item key={`menu-item-${itemIndex}`}>
                  <span>
                    <GifOutlined /> {item}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};
