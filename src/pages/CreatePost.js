import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import dataURItoBlob from '../functions/dataURIToBlob';
import { uploadImages } from '../functions/uploadImages';
import Loading from '../Loading';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from '../Editor';
import Imagepreview from '../Imagepreview';
import { AiOutlineFileAdd } from 'react-icons/ai';

const CreatePost = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // states>>>>>>>>>>>>>>>>>>>>>>>>
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const BlobImage = dataURItoBlob(image);
    const path = `BlogProject/${user.username}/post_images`;
    let formData = new FormData();
    formData.append('path', path);
    formData.append('file', BlobImage);

    const resultImage = await uploadImages(formData, path, token);

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts/create`,
      {
        title,
        summary,
        content,
        cover: resultImage[0].url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleCreatePost} style={{ marginTop: '4.5rem' }}>
      <h1>Create Post</h1>
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
        hidden
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImage}
        accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"
      />

      <div onClick={() => fileInputRef.current.click()} className="inputFile">
        <AiOutlineFileAdd size={28} />
        {!image ? 'Add Cover Photo' : 'Change Cover Photo'}
      </div>

      {image && <Imagepreview imgUrl={image} />}
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
};

export default CreatePost;
