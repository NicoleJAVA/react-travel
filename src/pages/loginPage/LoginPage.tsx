import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiBase = "https://vue3-course-api.hexschool.io"
interface User {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const navigate = useNavigate();

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const api = `${apiBase}/admin/signin`;

    try {
      const response = await axios.post(api, user);
      if (response.data.success) {
        console.log('Successfully logged in');
        const { token, expired } = response.data;
        document.cookie = `sellerToken=${token}; expires=${new Date(expired)}`;
        navigate('/dashboard/orders'); // todo stday 改成 products
      } else {
        console.error('Failed to sign in: ', response.data.message);
      }
    } catch (error) {
      console.error('Failed to sign in: ', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log("id, value", id, value); // todo stday
    setUser(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <form className="row justify-content-center" onSubmit={signIn}>
        <div className="col-md-6">
          <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
          <div className="mb-2">
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="username"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="text-end mt-4">
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              登入
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
