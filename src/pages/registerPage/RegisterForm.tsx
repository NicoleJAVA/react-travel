import { Form, Input, Button, Checkbox, notification } from "antd";
import styles from "./RegisterForm.module.scss";
import axios from "axios";
import { API_BASE } from "../../redux/helper/apiHelper";
import { useNavigate } from "react-router-dom";
import type { NotificationPlacement } from "antd/es/notification";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const notifyRegisterSuccess = (placement: NotificationPlacement) => {
  notification.info({
    message: `歡迎`,
    description: "您已註冊成功！",
    placement,
  });
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await axios.post(API_BASE + "/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      notifyRegisterSuccess("topRight");
      navigate("/login");
    } catch (error) {
      let errMsg = "註冊失敗！";
      if (error instanceof Error) {
        errMsg += error.message;
      }
      alert(errMsg);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Register failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        hasFeedback
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("您輸入的密碼不一致！");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
