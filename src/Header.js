import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { FaCreditCard } from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';

const Header = () => {
  // const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    successMessage: '',
    errorMessage: '',
  });
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get('token');

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/getProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: 'LOGIN', payload: data.user });
        setMessage({ ...message, successMessage: 'Logged in' });
      } catch (error) {
        setMessage({
          ...message,
          errorMessage: error?.response?.data?.message,
        });
        // console.log(error);
      }
    };

    getUser();
  }, []);

  // Logout functionlaity>>>>

  const handleLogout = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/logout`
    );

    dispatch({ type: 'LOGOUT' });
    navigate('/');
    Cookies.remove('token');
    Cookies.remove('user');
  };
  return (
    <header className="header">
      <Link to={'/'} className="logo">
        <FaCreditCard />
      </Link>
      {user ? (
        <>
          <Link
            to={'/create-post'}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <MdCreateNewFolder /> Create
          </Link>
          <Link onClick={() => handleLogout()}>Logout</Link>
        </>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/Register">Register</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
