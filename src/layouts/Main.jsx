import React from 'react';
import Routes from 'settings/Routes';
import * as GetRoute from 'utils/GetRoute';

export default function Main(props) {

  const routeSlug = GetRoute.RouteSlug();
  const checkPage = (routeSlug === '') ? 'front' : 'content';
  const isMain = 'main-' + checkPage;

  return (
    <React.Fragment>
      <main className={`main ${isMain}`} id="content">
        <Routes />
      </main>
    </React.Fragment>
  )

}