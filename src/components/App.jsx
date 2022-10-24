import React, { Component } from 'react';
import { AppMain } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPhoto } from 'components/fetchPhoto';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    name: '',
    gallery: [],
    page: 1,
    largeImage: '',
    showModal: false,
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchName = prevState.name;
    const { name, page, gallery } = this.state;
    if (prevPage !== page || prevSearchName !== name) {
      try {
        this.setState({ isLoading: true });
        const response = fetchPhoto(name, page);
        response.then(data => {
          data.data.hits.length === 0
            ? alert('Nothing found')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !gallery.some(image => image.id === id) &&
                  this.setState(({ gallery }) => ({
                    gallery: [...gallery, { id, webformatURL, largeImageURL }],
                  }));
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }

  onSubmit = name => {
    this.setState({ name: name, gallery: [] });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = index => {
    this.setState(({ gallery }) => ({
      showModal: true,
      largeImage: gallery[index].largeImageURL,
    }));
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { onSubmit, openModal, toggleModal, nextPage } = this;
    const { gallery, showModal, largeImage, isLoading } = this.state;
    return (
      <AppMain>
        <SearchBar onSubmit={onSubmit} />
        {gallery.length !== 0 && (
          <ImageGallery gallery={gallery} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        {gallery.length >= 12 && <Button nextPage={nextPage} />}
      </AppMain>
    );
  }
}
