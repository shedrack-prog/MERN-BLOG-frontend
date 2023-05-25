import React, { useEffect, useRef, useState } from 'react';
import Loading from '../Loading';
import Editor from '../Editor';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import dataURItoBlob from '../functions/dataURIToBlob';
import { uploadImages } from '../functions/uploadImages';
import { useSelector } from 'react-redux';
import { AiOutlineFileAdd } from 'react-icons/ai';
import Imagepreview from '../Imagepreview';

const EditPost = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [oldCover, setOldCover] = useState();

  const params = useParams();
  const { id } = params;
  const token = Cookies.get('token');
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(oldCover);

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large. max 5mb`);
      return;
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(
        `${file.name} is not supported. Only jpeg/jpg/webp/gif/png are allowed`
      );
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setImage(readerEvent.target.result);
      };
      console.log(image);
    }
  };

  //   Get the post data

  useEffect(() => {
    const getSinglePost = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
      setOldCover(data.cover);
      setLoading(false);
      setImage(data.cover);
    };
    getSinglePost();
  }, []);

  useEffect(() => {
    if (image) {
      setImgUrl(image);
      // console.log(oldCover);
    } else {
      setImgUrl(oldCover);
      // console.log(oldCover);
    }
  }, [image]);
  // Edit post functionality
  const handleEditPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (image) {
        const blobImage = dataURItoBlob(image);

        const formData = new FormData();
        const path = `BlogProject/${user.username}/post_images`;

        formData.append('path', path);
        formData.append('file', blobImage);

        const resultImage = await uploadImages(formData, path, token);
        const { data } = axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
          {
            title,
            summary,
            content,
            cover: resultImage[0].url || null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        // console.log(data);
        navigate(`/posts/${id}`);
        return;
      } else {
        const { data } = axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
          {
            title,
            summary,
            content,
            cover: oldCover,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        // console.log(data);
        navigate(`/posts/${id}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };
  if (loading) return <Loading />;
  return (
    <form onSubmit={handleEditPost} style={{ marginTop: '4.5rem' }}>
      <h1>Edit Post</h1>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="title"
        placeholder={'Summary'}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        onChange={handleImage}
        ref={fileInputRef}
        accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"
        style={{ display: 'none' }}
      />
      <div onClick={() => fileInputRef.current.click()} className="inputFile">
        <AiOutlineFileAdd size={28} />
        {!image && !oldCover ? 'Add Cover Photo' : 'Change Cover Photo'}
      </div>
      {image && <Imagepreview imgUrl={imgUrl} />}
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Edit post</button>
    </form>
  );
};

export default EditPost;
