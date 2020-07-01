import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: 'fitContent',
    border: '1px solid green',
    margin: '10px 10px',
    backgroundSize: 'auto',
  },
  media: {
    margin: 'auto',
    width: '20vw',
    height: '10vh',
  },
});

const Saved = () => {
  const classes = useStyles();

  const [bookState, setBookState] = useState({
    books: [],
  });

  useEffect(() => {
    axios
      .get('/api/books')
      .then(({ data }) => {
        setBookState({ ...bookState, books: data });
      })
      .catch((err) => console.error(err));
  }, []);

  bookState.handleDeleteBook = (book) => {
    axios
      .delete(`/api/books/${book._id}`)
      .then(() => {
        const books = JSON.parse(JSON.stringify(bookState.books));
        const booksFiltered = books.filter(
          (googleBook) => googleBook._id !== book._id
        );
        setBookState({ ...bookState, books: booksFiltered });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {bookState.books.map((book) => (
        <Card className={classes.root}>
          <CardHeader
            title={book.title}
            subheader={`Written by ${book.authors}`}
          />
          <CardMedia
            style={{
              backgroundSize: 'auto',
            }}
            className={classes.media}
            image={book.image}
            title={book.title}
          />
          <CardActions>
            <Button
              size='small'
              color='secondary'
              onClick={() => bookState.handleDeleteBook(book)}
            >
              Delete
            </Button>
            <Button size='small' color='primary' href={book.link}>
              View
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Saved;
