import React from 'react';

const PhotoFrame = props => {
  const isNull = () => false;
  const onImageClick = props._onClick || isNull
  return (
    <img
      className={props._classname}
      src={props._currentPhotoUrl}
      onClick={() => onImageClick(props._index)}
    />

  )
}

export default PhotoFrame;
