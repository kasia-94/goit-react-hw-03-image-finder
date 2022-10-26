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
    showModal: null,
    isLoading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchName = prevState.name;
    const { name, page } = this.state;

    if (prevPage !== page || prevSearchName !== name) {
      try {
        this.setState({ isLoading: true });

        const response = fetchPhoto(name, page);
        response.then(data => {
          if (!data.data.hits.length) {
            return alert('Nothing found');
          }

          const renderPhoto = data.data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          this.setState({
            gallery: [...this.state.gallery, ...renderPhoto],
            isLoading: false,
          });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      }
    }
  }

  onSubmit = name => {
    this.setState({ name: name, gallery: [], page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = id => {
    const photo = this.state.gallery.find(photo => photo.id === id);
    this.setState({
      showModal: {
        largeImageURL: photo.largeImageURL,
        tags: photo.tags,
      },
    });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { onSubmit, openModal, toggleModal, nextPage } = this;
    const { gallery, showModal, isLoading, error } = this.state;
    return (
      <AppMain>
        <SearchBar onSubmit={onSubmit} />
        {error &&
          alert(`Sorry, but something happened wrong: ${error.message}`)}
        {gallery.length !== 0 && (
          <ImageGallery gallery={gallery} openModal={openModal} />
        )}
        {showModal && (
          <Modal
            toggleModal={toggleModal}
            largeImageURL={showModal.largeImageURL}
            tags={showModal.tags}
          />
        )}
        {isLoading && <Loader />}
        {gallery.length >= 12 && <Button nextPage={nextPage} />}
      </AppMain>
    );
  }
}
