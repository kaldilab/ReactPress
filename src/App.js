import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'App.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import Scripts from 'assets/scripts';
import Head from 'settings/Head';
import Container from 'layouts/Container';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import Main from 'layouts/Main';
import A11y from 'layouts/A11y';

export default function App() {

  Scripts();

  return (
    <React.Fragment>
      <Router
        basename={process.env.PUBLIC_URL}
      >
        <Head />
        <A11y />
        <Container>
          <Header />
          <Main />
          <Footer />
        </Container>
      </Router>
    </React.Fragment>
  )

}