import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export const Button = ({ nextPage }) => {
  return (
    <ButtonStyled type="button" onClick={nextPage}>
      Load more
    </ButtonStyled>
  );
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
