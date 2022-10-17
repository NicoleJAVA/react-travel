import styles from "./UserForm.module.scss";
import { MainLayout } from "../../layout/mainLayout";
import { useState } from 'react';
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { checkout } from "../../redux/order/slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const UserForm: React.FC = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePhone = (e) => {
    setPhone(e.target.value);
  }

  const updateAddress = (e) => {
    setAddress(e.target.value);
  }

  const updateRemarks = (e) => {
    setRemarks(e.target.value);
  }

  const createOrder = async () => {
    if (name === "" || email === "" || phone === "" || address === "") {
      alert("請將必填欄位填寫完整");

      return;
    }

    try {
      const order = {
        user: {
          name: name,
          email: email,
          tel: phone,
          address: address,
        },
        message: remarks,
      };
      const result = await dispatch(checkout({ order: order }));
      if (result.payload) {
        navigate(`/checkout/${result.payload.orderId}`);
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <MainLayout>
      <div className={styles["full-container"]}>
        <div className={styles["form"]}>
          <div className={styles["form-title"]}>
            請填寫收件人資訊
          </div>

          {/* row begin */}
          <div className={styles["form-row"]}>
            <div className={styles["form-left-col"]}>
              <div className={styles["form-label"]}>
                姓名
              </div>
            </div>
            <div className={styles["form-right-col"]}>
              <input type="text" className={styles["form-input"]}
                placeholder="請輸入姓名" onChange={updateName} />
            </div>
          </div>
          {/* row end */}

          {/* row begin */}
          <div className={styles["form-row"]}>
            <div className={styles["form-left-col"]}>
              <div className={styles["form-label"]}>
                電子信箱
              </div>
            </div>
            <div className={styles["form-right-col"]}>
              <input type="text" className={styles["form-input"]}
                placeholder="請輸入電子信箱" onChange={updateEmail} />
            </div>
          </div>
          {/* row end */}

          {/* row begin */}
          <div className={styles["form-row"]}>
            <div className={styles["form-left-col"]}>
              <div className={styles["form-label"]}>
                電話號碼
              </div>
            </div>
            <div className={styles["form-right-col"]}>
              <input type="text" className={styles["form-input"]}
                placeholder="請輸入電話號碼" onChange={updatePhone} />
            </div>
          </div>
          {/* row end */}

          {/* row begin */}
          <div className={styles["form-row"]}>
            <div className={styles["form-left-col"]}>
              <div className={styles["form-label"]}>
                地址
              </div>
            </div>
            <div className={styles["form-right-col"]}>
              <input type="text" className={styles["form-input"]}
                placeholder="請輸入地址" onChange={updateAddress} />
            </div>
          </div>
          {/* row end */}

          {/* row begin */}
          <div className={styles["form-row"]}>
            <div className={styles["form-left-col"]}>
              <div className={styles["form-label"]}>
                留言
              </div>
            </div>
            <div className={styles["form-right-col"]}>
              <input type="text" className={styles["form-input"]}
                placeholder="請輸入留言" onChange={updateRemarks} />
            </div>
          </div>
          {/* row end */}

          <div className={styles["submit-btn"]} onClick={() => createOrder()}>
            建立訂單
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
