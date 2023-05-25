import React, { useEffect, useState } from 'react';
import Post from '../Post';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { posts } = useSelector((posts) => ({ ...posts }));
  // const isLoading = useSelector((state) => state);

  useEffect(() => {
    const getAllPosts = async () => {
      dispatch({ type: 'GET_POSTS_BEGIN', payload: { msg: 'fetch started' } });
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/getAllPosts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(data);
        dispatch({
          type: 'GET_POSTS_SUCCESS',
          payload: { data: data.allPosts, msg: 'success' },
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatch({
          type: 'GET_POSTS_ERROR',
          payload: { msg: error.response.data.message },
        });
      }
    };

    getAllPosts();
  }, []);
  // if (isLoading) return <Loading />;

  return (
    <div style={{ marginTop: '4.5rem' }}>
      {posts && posts.length > 0 ? (
        <div>
          {posts &&
            posts.map((pts) => {
              return <Post key={pts._id} post={pts} />;
            })}
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <h1>No posts display</h1>
      )}
    </div>
  );
};

export default HomePage;
