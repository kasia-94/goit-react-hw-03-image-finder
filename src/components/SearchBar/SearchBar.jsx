import PropTypes from 'prop-types';
import { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    inputName: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputName.trim() === '') {
      return alert('Please, I need to know what you are looking for!');
    }
    this.props.onSubmit(this.state.inputName);
    this.setState({ inputName: '' });
  };
  handleChange = e => {
    const { value } = e.target;
    this.setState({ inputName: value });
  };

  render() {
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <IoMdSearch style={{ width: 30, height: 30 }} />
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
