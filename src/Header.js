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

      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width="73.4985mm"
        height="13.2111mm"
        version="1.1"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        image-rendering="optimizeQuality"
        fill-rule="evenodd"
        clip-rule="evenodd"
        viewBox="0 0 1180.16 212.13"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        class="h-12 w-32 md:w-40"
      >
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
          <g id="_1744451745072">
            <polygon
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              points="37.12,121.73 37.12,1.19 7.45,1.19 7.45,121.73 "
            ></polygon>
            <path
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              d="M168.93 61.46c0,-18.96 1.53,-34.33 -12.55,-48.41 -8.31,-8.31 -20.01,-11.87 -32.55,-11.87l-44.76 0 0 120.55 44.76 0c12.55,0 24.25,-3.56 32.55,-11.87 14.07,-14.07 12.55,-29.45 12.55,-48.41zm-29.67 0c0,20.46 -0.85,23.68 -3.22,27.07 -2.71,4.07 -6.78,6.75 -14.24,6.75l-13.05 0 0 -67.65 13.05 0c7.46,0 11.53,2.68 14.24,6.75 2.37,3.39 3.22,6.78 3.22,27.07z"
            ></path>
            <polygon
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              points="292.77,121.73 292.77,95.28 240.38,95.28 240.38,74.09 285.14,74.09 285.14,47.64 240.38,47.64 240.38,27.64 292.77,27.64 292.77,1.19 210.71,1.19 210.71,121.73 "
            ></polygon>
            <path
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              d="M421.18 61.38c0,-18.14 0.51,-35.1 -12.21,-47.81 -8.82,-8.82 -18.99,-13.56 -33.74,-13.56 -14.75,0 -24.92,4.75 -33.74,13.56 -12.72,12.72 -12.21,29.67 -12.21,47.81 0,18.14 -0.51,35.1 12.21,47.81 8.82,8.82 18.99,13.56 33.74,13.56 14.75,0 24.92,-4.75 33.74,-13.56 12.72,-12.72 12.21,-29.67 12.21,-47.81zm-29.67 0c0,22.04 -1.69,25.94 -4.41,29.5 -2.2,2.88 -6.44,5.42 -11.87,5.42 -5.43,0 -9.66,-2.54 -11.87,-5.42 -2.71,-3.56 -4.41,-7.46 -4.41,-29.5 0,-22.04 1.7,-26.11 4.41,-29.67 2.2,-2.88 6.44,-5.26 11.87,-5.26 5.43,0 9.66,2.37 11.87,5.26 2.71,3.56 4.41,7.63 4.41,29.67z"
            ></path>
            <path
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              d="M543.33 84.77c0,-11.19 -2.54,-20.18 -8.99,-26.45 -5.09,-5.09 -12.89,-8.48 -23.74,-10l-14.58 -2.04c-4.24,-0.51 -6.78,-2.03 -8.31,-3.56 -1.87,-1.86 -2.37,-4.07 -2.37,-5.59 0,-5.26 4.24,-11.19 14.58,-11.19 5.26,0 15.26,-0.51 22.89,7.12l18.65 -18.65c-10.34,-10.34 -23.4,-14.41 -40.69,-14.41 -27.47,0 -44.08,16.11 -44.08,38.15 0,10.34 2.71,18.48 8.31,24.24 5.43,5.6 13.56,9.16 24.24,10.68l14.58 2.03c3.9,0.51 6.44,1.7 7.97,3.22 1.7,1.86 2.37,4.24 2.37,7.12 0,6.95 -5.59,10.85 -17.29,10.85 -9.66,0 -20.68,-2.2 -26.96,-8.48l-18.99 18.99c12.21,12.55 27.3,15.94 45.78,15.94 25.43,0 46.63,-13.39 46.63,-37.98z"
            ></path>
            <path
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              d="M671.4 39.93c0,-19.75 -14.41,-38.74 -41.2,-38.74l-47.81 0 0 120.55 29.67 0 0 -43.06 18.14 0c26.79,0 41.2,-18.99 41.2,-38.74zm-29.67 0c0,6.24 -4.75,12.12 -12.89,12.12l-16.78 0 0 -24.25 16.78 0c8.14,0 12.89,5.88 12.89,12.12z"
            ></path>
            <polygon
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              points="799.65,121.73 799.65,1.19 769.98,1.19 769.98,47.47 738.45,47.47 738.45,1.19 708.78,1.19 708.78,121.73 738.45,121.73 738.45,73.92 769.98,73.92 769.98,121.73 "
            ></polygon>
            <polygon
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              points="926.88,121.73 926.88,95.28 874.5,95.28 874.5,74.09 919.25,74.09 919.25,47.64 874.5,47.64 874.5,27.64 926.88,27.64 926.88,1.19 844.82,1.19 844.82,121.73 "
            ></polygon>
            <path
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              d="M1062.76 121.73l-26.11 -50.27c9.49,-4.75 19.67,-15.06 19.67,-31.48 0,-19.81 -14.41,-38.8 -41.2,-38.8l-47.81 0 0 120.55 29.67 0 0 -44.87 10 0 21.36 44.87 34.42 0zm-36.11 -81.75c0,6.24 -4.75,12.18 -12.89,12.18l-16.78 0 0 -24.36 16.78 0c8.14,0 12.89,5.91 12.89,12.18z"
            ></path>
            <polygon
              class="fill-theme transition-colors duration-[200] ease-linear"
              fill-rule="nonzero"
              points="1180.16,121.73 1180.16,95.28 1127.77,95.28 1127.77,74.09 1172.53,74.09 1172.53,47.64 1127.77,47.64 1127.77,27.64 1180.16,27.64 1180.16,1.19 1098.1,1.19 1098.1,121.73 "
            ></polygon>
            <path
              class="fill-[#ff0000]"
              fill-rule="nonzero"
              d="M42.19 183.09c0,-9.87 0.08,-17 -5.69,-22.78 -4.01,-4.01 -8.9,-6.26 -15.4,-6.26 -6.5,0 -11.47,2.25 -15.48,6.26 -5.78,5.77 -5.62,12.91 -5.62,22.78 0,9.87 -0.16,17 5.62,22.78 4.01,4.01 8.98,6.26 15.48,6.26 6.5,0 11.39,-2.25 15.4,-6.26 5.78,-5.78 5.69,-12.91 5.69,-22.78z"
            ></path>
          </g>
        </g>
      </svg> */}
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
