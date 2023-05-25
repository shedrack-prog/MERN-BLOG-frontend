import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const initialState = {
  username: '',
  password: '',
  successMessage: '',
  errorMessage: '',
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, password } = user;
    if (username === '' || password === '') {
      setUser({ ...user, errorMessage: 'Please provide all values' });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      setUser({
        ...user,
        successMessage: data.message,
        username: '',
        password: '',
      });
      Cookies.set('token', data.token);
      Cookies.set('user', JSON.stringify(data.user));
      dispatch({ type: 'LOGIN', payload: data.user });

      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setUser({ ...user, errorMessage: error.response.data.message });
      setLoading(false);
    }
  };

  // setTimeout(() => {
  //   setUser({ ...user, errorMessage: '', successMessage: '' });
  // }, 3000);

  if (loading) return <Loading />;
  return (
    <form
      className="login"
      onSubmit={handleSubmit}
      style={{ marginTop: '4.5rem' }}
    >
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      {user.errorMessage && <p className="errorText">{user.errorMessage}</p>}
      {user.successMessage && (
        <p className="successText">{user.successMessage}</p>
      )}

      <button>{loading ? 'Please wait' : 'Login'}</button>
    </form>
  );
};

export default LoginPage;
