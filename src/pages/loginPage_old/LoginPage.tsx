import React from "react";
import styles from "./LoginPage.module.scss";
import { UserLayout } from "../../layout/userLayout";
import { LoginForm } from "./LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <UserLayout>
      <LoginForm />
    </UserLayout>
  );
};
