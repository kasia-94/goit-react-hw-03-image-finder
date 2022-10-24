import React, { Component } from 'react';
import { AppMain } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPhoto } from 'components/fetchPhoto';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    name: '',
    gallery: [],
    page: 1,
    largeImage: '',
    showModal: false,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.name !== this.state.name
  //   ) {
  //     try {
  //       const response = fetchPhoto(this.state.page, this.state.name);

  //       this.setState(prevState => ({
  //         gallery: [...prevState.gallery, ...response],
  //       }));
  //     } catch (error) {
  //       this.setState({ error });
  //     }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchData = prevState.name;
    const { name, page, gallery } = this.state;
    if (prevPage !== page || prevSearchData !== name) {
      try {
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
        });
      } catch (error) {
        this.setState({ error });
      } finally {
      }
    }
  }

  onSubmit = name => {
    if (name.trim() === '') {
      return alert('Please, I need to know what you are looking for!');
    }
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

  render() {
    return (
      <AppMain>
        <SearchBar onSubmit={this.onSubmit} />
        {this.state.gallery.length !== 0 && (
          <ImageGallery
            gallery={this.state.gallery}
            openModal={this.openModal}
          />
        )}
        {this.state.showModal && (
          <Modal
            toggleModal={this.toggleModal}
            largeImage={this.state.largeImage}
          />
        )}
      </AppMain>
    );
  }
}
