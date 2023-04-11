import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardMedia, CardHeader } from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';
import BookActionButton from '../../components/BookActionButton';
import { BookAPI } from '../../utils/BookAPI';
import './saved.css';

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
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      try {
        const { data } = await BookAPI.read();
        if (isMounted) {
          setBooks(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteBook = async (book) => {
    try {
      await BookAPI.delete(book._id);
      const filteredBooks = books.filter((b) => b._id !== book._id);
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBooks = () => {
    return books.map((book) => (
      <Card key={book._id} className={classes.root}>
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
          <BookActionButton
            size='small'
            color='secondary'
            onClick={() => handleDeleteBook(book)}
          >
            <FavoriteBorder />
            UnSave
          </BookActionButton>
          <BookActionButton size='small' color='secondary'>
            <a href={book.link} target='_blank' rel='noopener noreferrer'>
              <span>View</span>
            </a>
          </BookActionButton>
        </CardActions>
      </Card>
    ));
  };

  return (
    <section className='search_results'>
      {books.length ? renderBooks() : <h1>No Saved Books</h1>}
    </section>
  );
};

export default Saved;
