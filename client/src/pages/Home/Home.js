import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  TextField,
  Link,
} from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import axios from 'axios';
import './home.css';

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

let trimString = function (string, length) {
  return string.length > length ? string.substring(0, length) + '...' : string;
};

const Home = () => {
  const classes = useStyles();
  const [bookState, setBookState] = useState({
    search: '',
    books: [],
  });

  bookState.handleInputChange = (event) => {
    setBookState({ ...bookState, [event.target.name]: event.target.value });
  };

  bookState.handleSearchBook = async (event) => {
    event.preventDefault();
    if (bookState.search.length > 0) {
      await axios
        .get(`/api/books/${bookState.search}`)
        .then(({ data }) => {
          setBookState({ ...bookState, books: data });
        })
        .catch((err) => console.error(err));
    }
  };

  bookState.handleSaveBook = async (book) => {
    await axios
      .post('/api/books', {
        title: book.volumeInfo.title,
        author: JSON.stringify(
          book.volumeInfo.authors && book.volumeInfo.authors[0]
        ),
        description: book.volumeInfo.description,
        image:
          book.volumeInfo.imageLinks &&
          book.volumeInfo.imageLinks.smallThumbnail,
        link: book.volumeInfo.previewLink,
        bookId: book.id,
      })
      .then(() => {
        const books = bookState.books;
        const booksFiltered = books.filter(
          (googleBook) => googleBook.id !== book.id
        );
        setBookState({ ...bookState, books: booksFiltered });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <form className='home__searh__form' onSubmit={bookState.handleSearchBook}>
        <TextField
          label='Search Book Title'
          name='search'
          value={bookState.search}
          onChange={bookState.handleInputChange}
        />
        <Button
          variant='outlined'
          color='primary'
          onClick={bookState.handleSearchBook}
        >
          Search
        </Button>
      </form>
      <section className='search_results'>
        {bookState.books.map((book, index) => (
          <Card className={classes.root} key={index}>
            <CardHeader
              title={trimString(book.volumeInfo.title, 30)}
              subheader={`Written by ${
                book.volumeInfo.authors &&
                JSON.stringify(book.volumeInfo.authors[0])
              }`}
            />
            <CardMedia
              style={{
                backgroundSize: 'auto',
              }}
              className={classes.media}
              image={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail
              }
              title={book.volumeInfo.title}
            />
            <CardActions>
              <Button
                size='small'
                color='secondary'
                onClick={() => bookState.handleSaveBook(book)}
              >
                <Favorite />
                Save
              </Button>
              <Button size='small' color='secondary'>
                <Link href={book.volumeInfo.previewLink} target='_blank'>
                  Preview
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </section>
    </>
  );
};

export default Home;
