import React from "react";
import styles from "./Register.module.scss";
import { UserLayout } from "../../layout/userLayout";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <UserLayout>
      <RegisterForm />
    </UserLayout>
  );
};
