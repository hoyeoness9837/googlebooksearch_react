import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  TextField,
  Link,
} from "@material-ui/core";
import axios from "axios";
import "./home.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "10px 10px",
  },
  media: {
    width: "100%",
    height: "20vh",
  },
});

const Home = () => {
  const classes = useStyles();
  const [bookState, setBookState] = useState({
    search: "",
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
      .post("/api/books", {
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
      <form className="home__searh__form" onSubmit={bookState.handleSearchBook}>
        <TextField
          label="Search Book Title"
          name="search"
          value={bookState.search}
          onChange={bookState.handleInputChange}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={bookState.handleSearchBook}
        >
          Search
        </Button>
      </form>
      <section className="search_results">
        {bookState.books.map((book) => (
          <Card className={classes.root}>
            <CardHeader
              title={book.volumeInfo.title}
              subheader={`Written by ${
                book.volumeInfo.authors &&
                JSON.stringify(book.volumeInfo.authors[0])
              }`}
            />
            <CardMedia
              style={{
                backgroundSize: "auto",
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
                size="small"
                color="secondary"
                onClick={() => bookState.handleSaveBook(book)}
              >
                Save
              </Button>
              <Button size="small" color="secondary">
                <Link href={book.volumeInfo.previewLink} target="_blank">
                  View
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
