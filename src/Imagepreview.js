import React, { useEffect, useState } from 'react';

const Imagepreview = ({ imgUrl }) => {
  return (
    <div className="image_preview">
      <div>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
};

export default Imagepreview;
