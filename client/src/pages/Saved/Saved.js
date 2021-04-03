import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  CardHeader,
  Link,
} from "@material-ui/core";
import axios from "axios";
import "./saved.css";

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

const Saved = () => {
  const classes = useStyles();

  const [bookState, setBookState] = useState({
    books: [],
  });

  useEffect(() => {
    axios
      .get("/api/books")
      .then(({ data }) => {
        setBookState({ ...bookState, books: data });
      })
      .catch((err) => console.error(err));
  }, [bookState]);

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
    <section className="search_results">
      {bookState.books.map((book) => (
        <Card className={classes.root}>
          <CardHeader
            title={book.title}
            subheader={`Written by ${book.author}`}
          />
          <CardMedia
            style={{
              backgroundSize: "auto",
            }}
            className={classes.media}
            image={book.image}
            title={book.title}
          />
          <CardActions>
            <Button
              size="small"
              color="secondary"
              onClick={() => bookState.handleDeleteBook(book)}
            >
              UnSave
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
  );
};

export default Saved;
