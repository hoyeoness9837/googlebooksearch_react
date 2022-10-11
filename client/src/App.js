import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Saved from './pages/Saved';
import { BookProvider } from './utils/GlobalState';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <BookProvider>
            <Home />
          </BookProvider>
        </Route>
        <Route path='/saved'>
          <BookProvider>
            <Saved />
          </BookProvider>
        </Route>
        <Redirect path='*' to='/' />
      </Switch>
    </Router>
  );
};

export default App;
