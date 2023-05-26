import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const Post = ({ post }) => {
  const truncateText = (num, str) => {
    if (str.length > num) {
      return str.slice(0, num) + '...Read more ';
    }
    return str;
  };
  return (
    <>
      <div className="post">
        <Link
          to={`posts/${post._id}`}
          style={{ color: 'black' }}
          className="navigating_links"
        >
          <div className="image">
            <img src={post.cover} alt="cover Image" className="cover_image" />
          </div>
        </Link>
        <Link
          to={`posts/${post._id}`}
          style={{ color: 'black' }}
          className="navigating_links"
        >
          <div className="texts">
            <h2>{post.title}</h2>

            <p className="info">
              <span href="" className="author">
                {post.createdBy.username}
              </span>
              <time>{moment(post.createdAt).format('D MMM YYYY')}</time>
            </p>
            <p
              className="summary"
              dangerouslySetInnerHTML={{
                __html: truncateText(220, post?.content),
              }}
            />
          </div>
        </Link>
      </div>

      <div className="underline" />
    </>
  );
};

export default Post;
