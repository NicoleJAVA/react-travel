import React from "react";
import styles from "./ShoppingCart.module.scss";
import theme from "../../Theme.module.scss";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col, Affix, Spin } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import {
  updateCart,
  deleteShoppingCartItems,
} from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";
import { API_SOURCE, UDEMY } from '../../helpers/constants';

const isUdemy = API_SOURCE === UDEMY;

export const ShoppingCart: React.FC = () => {
  const loadingCart = useSelector((s) => s.shoppingCart.loading);
  const shoppingCart = useSelector((s) => s.shoppingCart.items)
  const [couponCode, setCouponCode] = useState<string>("");

  let shoppingCartItems;
  if (isUdemy) {
    shoppingCartItems = shoppingCart;
  } else {
    shoppingCartItems = shoppingCart.carts;
  }

  const onCartPlus = (cart) => {
    onUpdateCart(cart, cart.qty + 1);
  }

  const onCartMinus = (cart) => {
    if (cart.qty <= 1) return;

    onUpdateCart(cart, cart.qty - 1);
  }

  const onUpdateCart = (cart, quantity) => {
    const cartData = {
      cartId: cart.id,
      productId: cart.product.id,
      qty: quantity,
    }
    dispatch(updateCart(cartData));
  }

  const updateCouponCode = (e) => {
    setCouponCode(e.target.value);
  }

  const applyCouponCode = () => {
    // todo

  }

  const jwt = useSelector((s) => s.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Spin spinning={loadingCart}>
        <Row>
          {/* shopping cart item list */}
          <Col span={16}>
            <div className={styles["product-list-container"]}>
              {/* {isUdemy && <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />} */}
              {!isUdemy && shoppingCartItems &&
                shoppingCartItems.map((item, i) => (
                  <div key={`cart-item-${i}`} className={styles["cart-item"]}>
                    <div className={styles["cart-item-text"]}>
                      <div>{item.product.title}</div>
                      <div className={styles["cart-item-first-row"]}>
                        <div>原價 ${item.product.origin_price}</div>
                        <div>特價 ${item.product.price}</div>
                      </div>
                      <div className={styles["cart-item-divider"]}></div>
                      <div className={styles["cart-item-second-row"]}>
                        <div className={styles["cart-item-qty-wrap"]}>
                          <div className={theme["mb-1"]}>
                            數量： {item.qty}
                          </div>
                          <div className={styles["cart-item-qty-buttons"]}>
                            <div className={styles["left-rounded"]} onClick={() => onCartMinus(item)}>
                              -
                            </div>
                            <div className={styles["right-rounded"]} onClick={() => onCartPlus(item)}>
                              +
                            </div>
                          </div>
                        </div>

                        <div>小計 ${item.total}</div>
                        <div>折扣價 ${item.final_total}</div>
                      </div>
                    </div>
                    <div className={styles["cart-item-img"]}>

                    </div>
                  </div>
                ))
              }
            </div>
          </Col>
          {/* payment */}
          <Col span={8}>




            <div className={styles["cart-checkout-section"]}>
              <div className={styles["cart-checkout-title"]}>
                CHECKOUT
              </div>

              {/* row */}
              <div className={styles["checkout-row"]}>
                <div className={styles["checkout-left-col"]}>
                  <div className={styles["checkout-label"]}>
                    總計
                  </div>
                </div>
                <div className={styles["checkout-right-col"]}>
                  $ {shoppingCart.total}
                </div>
              </div>

              {/* row */}
              <div className={styles["checkout-row"]}>
                <div className={styles["checkout-left-col"]}>
                  <div className={styles["checkout-label"]}>
                    折扣價
                  </div>
                </div>
                <div className={styles["checkout-right-col"]}>
                  $ {shoppingCart.final_total}
                </div>
              </div>

              {/* row */}
              <div className={styles["checkout-row"]}>
                <div className={styles["checkout-left-col"]}>
                  <input type="text" className={styles["coupon-input"]} placeholder="請輸入優惠碼" onChange={updateCouponCode} />
                </div>
                <div className={styles["checkout-right-col"]}>
                  <div className={styles["coupon-btn"]} onClick={() => applyCouponCode()}>套用優惠碼</div>
                </div>
              </div>
            </div>

          </Col>
        </Row>
      </Spin>
    </MainLayout>
  );
};
