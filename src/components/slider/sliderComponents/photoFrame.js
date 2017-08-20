import React, { PropTypes } from 'react';

const PhotoFrame = props => {
  const isNull = () => false;
  const onImageClick = props._onClick || isNull
  return (
    <img
      className={ props._classname }
      src={ props._currentPhotoUrl }
      onClick={ () => onImageClick(props._index) }
    />

  )
}

PhotoFrame.propTypes = {
  _classname      : PropTypes.string.isRequired,
  _currentPhotoUrl: PropTypes.string.isRequired,
  onClick        : PropTypes.func,
  _index          : PropTypes.number
}
export default PhotoFrame;
