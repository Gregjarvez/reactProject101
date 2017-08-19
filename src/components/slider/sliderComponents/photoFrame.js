import React from 'react';

const PhotoFrame = props => {
  const isNull = () => false;

  return (
    <img
      className={props._classname}
      src={props._currentPhotoUrl}
      onClick={() => (props._onClick || isNull)}
    />

  )
}

export default PhotoFrame;
