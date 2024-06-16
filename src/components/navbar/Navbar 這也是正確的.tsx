import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import logoSrc from "../../assets/img/sakura_logo.png";

interface PropsType { }

export const Navbar: React.FC<PropsType> = ({ children }) => {
  const navigate = useNavigate();
  const fixedNav = useRef<HTMLElement>(null);
  let [isFixed, setIsFixed] = useState<boolean>(false);
  let [navOffset, setNavOffset] = useState<number>(0);

  useEffect(() => {
    if (fixedNav && fixedNav.current) {
      setNavOffset(fixedNav.current.offsetTop);
    }
    window.addEventListener("scroll", setNabarFixed);

  }, []);
  const setNabarFixed = () => {
    if (!(fixedNav && fixedNav.current)) {
      // console.log(""); // todo stday
      console.log("A.."); // todo stday
    } else {
      console.log("B.."); // todo stday

    }
    if (!(fixedNav && fixedNav.current)) return;

    if (window.scrollY > navOffset) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  // window.addEventListener("scroll", setNabarFixed);

  const onClickHome = () => {
    navigate("/");
  };

  const onClickShop = () => {
    navigate("/");
  };

  const onClickCart = () => {
    navigate("/shoppingCart");
  };

  return (
    <div>
      <img className={styles["sakura-logo"]} src={logoSrc} alt="sakura logo" />

      <div>
        <div
          ref={fixedNav as React.RefObject<HTMLDivElement>}
          className={styles[`${isFixed ? "fixed-nav" : "non-fixed-nav"}`]}
        >
          <a onClick={() => onClickHome()}>
            <div className={styles["nav-title"]}>HOME</div>
          </a>
          <a onClick={() => onClickShop()}>
            <div className={styles["nav-title"]}>SHOP</div>
          </a>
          <a onClick={() => onClickCart()}>
            <div className={styles["nav-title"]}>CART</div>
          </a>
        </div>
      </div>
    </div>
  );
};
