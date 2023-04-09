import React from 'react';
import { IconButton } from '@material-ui/core';
const BookActionButton = ({ bookProp, buttonProp }) => {
  return (
    <>
      <IconButton
        size={btnProp.size}
        color={btnProp.color}
        onClick={() => {
          btnProp.action(bookProp);
        }}
      >
        {buttonProp.name}
      </IconButton>
    </>
  );
};

export default BookActionButton;
