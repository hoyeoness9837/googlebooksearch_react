import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext({
  user: null,
  loading: true,
  error: null,
});

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: action.user, loading: false };
    }
    case 'SET_ERROR': {
      return { ...state, error: action.error, loading: false };
    }
    case 'LOGOUT': {
      return { ...state, user: null, loading: false };
    }
    default: {
      return state;
    }
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    loading: true,
    error: null,
  });

  const signUp = async (username, password) => {
    try {
      const res = await axios.post('/api/signup', { username, password });
      const { user } = res.data;
      dispatch({ type: 'SET_USER', user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error });
    }
  };

  const login = async (username, password) => {
    try {
      const res = await axios.post('/api/login', { username, password });
      const { user } = res.data;
      dispatch({ type: 'SET_USER', user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error });
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error });
    }
  };

  const value = { state, signUp, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
