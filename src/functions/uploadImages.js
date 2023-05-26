import axios from 'axios';

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts/uploadImage`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
          Accept: 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
