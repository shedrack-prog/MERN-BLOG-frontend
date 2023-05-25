import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const initialState = {
  username: '',
  email: '',
  password: '',
  errorMessage: '',
  successMessage: '',
};

const RegisterPage = () => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, email, password } = user;
    if (username === '' || email === '' || password === '') {
      setUser({ ...user, errorMessage: 'Please provide all values' });
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          email,
          username,
          password,
        }
      );
      setUser({ ...user, successMessage: data.message });
      Cookies.set('token', data.token);

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
  // }, 2000);

  if (loading) return <Loading />;

  return (
    <form
      className="register"
      onSubmit={handleSubmit}
      style={{ marginTop: '4.5rem' }}
    >
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        name="email"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        name="password"
        onChange={handleChange}
      />
      {user.errorMessage && <p className="errorText">{user.errorMessage}</p>}
      {user.successMessage && (
        <p className="successText">{user.successMessage}</p>
      )}
      <button>{loading ? 'Please wait' : 'Register'}</button>
    </form>
  );
};

export default RegisterPage;
