import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, ImageGalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, openModal, index }) => {
  return (
    <GalleryItem>
      <ImageGalleryImage
        src={webformatURL}
        onClick={() => openModal(index)}
        alt=""
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
