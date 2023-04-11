import React from 'react';
import { IconButton } from '@material-ui/core';
const BookActionButton = (props) => {
  return (
    <>
      <IconButton size={props.size} color={props.color} onClick={props.onClick}>
        {props.children}
      </IconButton>
    </>
  );
};

export default BookActionButton;
