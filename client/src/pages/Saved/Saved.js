import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios';
import './saved.css'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '10px 10px',
  },
  media: {
    width: '100%',
    height: '20vh',
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

  bookState.handleDeleteBook = async (book) => {
    await axios
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
    <section className='search_results'>
      {bookState.books.map((book) => (
        <Card className={classes.root}>
          <CardHeader
            title={book.title}
            subheader={`Written by ${book.author}`}
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
              UnSave
            </Button>
            <Button size='small' color='primary' href={book.link}>
              View
            </Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

export default Saved;
