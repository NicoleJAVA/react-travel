import styles from "./CheckoutPage.module.scss";
import { MainLayout } from "../../layout/mainLayout";
import { Spin } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { API_SOURCE, UDEMY } from "../../helpers/constants";
import { useEffect } from "react";
import { getOrder, payOrder } from "../../redux/order/slice";
import { useParams } from "react-router-dom";

type MatchParams = {
  orderId: string;
};

const isUdemy = API_SOURCE === UDEMY;

export const CheckoutPage: React.FC = () => {
  // const orderId = useSelector((state) => state.order.orderId);
  const { orderId } = useParams<MatchParams>();
  const order = useSelector((state) => state.order.currentOrder);
  const orderMeta = useSelector((state) => state.order.orderMeta);
  const orderUser = useSelector((state) => state.order.orderUser);
  const loading = useSelector((s) => s.shoppingCart.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrder({ orderId: orderId }));
  }, []);

  const onPayOrder = () => {
    dispatch(payOrder({ orderId: orderId }));
  };

  return (
    <MainLayout>
      <Spin spinning={loading}>
        <div className={styles["content-container"]}>
          <table className={styles["data-table"]}>
            <thead className={styles["text-theme"]}>
              <th className={styles["text-start"]}>品名</th>
              <th className={styles["text-end"]}>數量</th>
              <th className={styles["text-end"]}>單價</th>
            </thead>
            <tbody>
              {!isUdemy &&
                order &&
                orderMeta &&
                orderMeta.order &&
                Object.keys(order)
                  .map((o) => order[o])
                  .map((item, i) => (
                    <tr
                      key={`order-item-${i}`}
                      className={styles["order-item"]}
                    >
                      <td>{item.product.title}</td>
                      <td className={styles["text-end"]}>{item.qty}</td>
                      <td className={styles["text-end"]}>
                        ${item.final_total}
                      </td>
                    </tr>
                  ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className={styles["order-total-label"]}>
                  總計
                </td>
                {orderMeta && orderMeta.order && (
                  <td className={styles["order-total"]}>
                    ${orderMeta.order.total}
                  </td>
                )}
              </tr>
            </tfoot>
          </table>

          {orderUser && (
            <table className={styles["data-table"]}>
              <tbody>
                <tr>
                  <th className={styles["user-column-label"]}>Email</th>
                  <td>{orderUser.email}</td>
                </tr>
                <tr>
                  <th className={styles["user-column-label"]}>姓名</th>
                  <td>{orderUser.name}</td>
                </tr>
                <tr>
                  <th className={styles["user-column-label"]}>收件人電話</th>
                  <td>{orderUser.tel}</td>
                </tr>
                <tr>
                  <th className={styles["user-column-label"]}>收件人地址</th>
                  <td>{orderUser.address}</td>
                </tr>
                <tr>
                  <th className={styles["user-column-label"]}>付款狀態</th>

                  <td>
                    {orderMeta &&
                      orderMeta.order &&
                      orderMeta.order.is_paid && (
                        <span className={styles["paid"]}>付款完成</span>
                      )}
                    {orderMeta &&
                      orderMeta.order &&
                      !orderMeta.order.is_paid && (
                        <span className={styles["not-paid"]}>尚未付款</span>
                      )}
                  </td>
                </tr>
              </tbody>
              {/* <tfoot>
            <tr>

            </tr>
          </tfoot> */}
            </table>
          )}
          <div className={styles["pay-btn-container"]}>
            {orderMeta && orderMeta.order && !orderMeta.order.is_paid && (
              <div className={styles["pay-btn"]} onClick={() => onPayOrder()}>
                確認付款去
              </div>
            )}
          </div>
        </div>
      </Spin>
    </MainLayout>
  );
};
