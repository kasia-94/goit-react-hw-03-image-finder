import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, openModal }) => (
  <Gallery>
    {gallery.map(({ id, webformatURL }, index) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        index={index}
        openModal={openModal}
      ></ImageGalleryItem>
    ))}
  </Gallery>
);

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
