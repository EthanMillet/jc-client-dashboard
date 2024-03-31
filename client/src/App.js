import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './components/login'
import Ref from './components/ref'

const httpLink = createHttpLink({
  uri: process.env.herokuLink || 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/ref' element={<Ref/>}></Route>
    </Routes>

    </ApolloProvider>
  );
}

export default App;
