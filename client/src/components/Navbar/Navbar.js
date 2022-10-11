import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Favorite, Search } from '@material-ui/icons';
import './navbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.link}>
              Google Books Search
            </Link>
          </Typography>
          <Link to='/' className={classes.link}>
            <Button color='inherit'>
              <Search />
              Search
            </Button>
          </Link>
          <Link to='/saved' className={classes.link}>
            <Button color='inherit'>
              <Favorite />
              Saved
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
