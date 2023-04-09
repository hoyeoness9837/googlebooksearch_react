import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  TextField,
  Link,
} from '@material-ui/core';
import { Favorite, Search } from '@material-ui/icons';
import { BookAPI } from '../../utils/BookAPI';
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
  const [search, setSearch] = useState('');
  const [bookState, setBookState] = useState([]);

  const handleInputChange = (event) => {
    event.target.value && setSearch(event.target.value);
  };

  const handleSearchBook = async (event) => {
    event.preventDefault();
    try {
      const { data } = await BookAPI.search(search);
      setBookState(data);
    } catch (error) {
      console.log(error);
    }
    setSearch('');
  };

  const handleSaveBook = async (book) => {
    try {
      await BookAPI.create({
        title: trimString(book.volumeInfo.title, 30),
        author: JSON.stringify(
          book.volumeInfo.authors && book.volumeInfo.authors[0]
        ),
        description: book.volumeInfo.description,
        image:
          book.volumeInfo.imageLinks &&
          book.volumeInfo.imageLinks.smallThumbnail,
        link: book.volumeInfo.previewLink,
        id: book.id,
      });
      //make saved books disappear from search result to prevent users clicking save multiple times.
      const booksNotSaved = bookState.filter(
        (allBook) => allBook.id !== book.id
      );
      setBookState(booksNotSaved);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBooks = () => {
    return bookState.map((book) => (
      <Card key={book.id} className={classes.root}>
        <CardHeader
          title={trimString(book.volumeInfo.title, 30)}
          subheader={`Written by ${
            book.volumeInfo.authors && book.volumeInfo.authors[0]
          }`}
        />
        <CardMedia
          key={book.etag}
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
          <IconButton
            size='small'
            color='secondary'
            onClick={() => handleSaveBook(book)}
          >
            <Favorite />
            Save
          </IconButton>
          <IconButton size='small' color='secondary'>
            <Link
              href={book.volumeInfo.previewLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              Preview
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    ));
  };

  return (
    <>
      <form className='home__searh__form' onSubmit={handleSearchBook}>
        <TextField
          label='Search any books by title'
          name='search'
          value={search}
          onChange={handleInputChange}
        />
        <Button variant='outlined' color='primary' onClick={handleSearchBook}>
          <Search />
          Search
        </Button>
      </form>
      <section className='search_results'>{renderBooks()}</section>
    </>
  );
};

export default Home;
