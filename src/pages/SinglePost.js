import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import moment from 'moment';
import { useSelector } from 'react-redux';

const SinglePost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const params = useParams();
  const postId = params.id;
  const token = Cookies.get('token');
  const { user } = useSelector((user) => ({ ...user }));
  useEffect(() => {
    const getSinglePost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`
        );
        setLoading(false);
        // console.log(user);
        // console.log(data);
        // console.log(data);
        setPost(data);
      } catch (error) {
        setLoading(false);
      }
    };
    getSinglePost();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="Post-page" style={{ marginTop: '4.5rem' }}>
      <h1>{post?.title}</h1>
      <h3 style={{ color: 'gray' }}>{post?.summary}</h3>
      <time>{moment(post?.createdAt).format('D MMM YYYY')}</time>
      <div className="author">by @{post?.createdBy?.username}</div>

      {user?._id === post?.createdBy?._id && (
        <div className="edit-row">
          <Link
            className="edit-btn"
            to={`/posts/edit/${post?._id}`}
            style={{ color: 'black', fontSize: '18px' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={post?.cover} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      />
    </div>
  );
};

export default SinglePost;
