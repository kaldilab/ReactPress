import React from 'react';
import { browserName } from "react-device-detect";
import * as GetRoute from 'utils/GetRoute';
import * as GetAuth from 'utils/GetAuth';

export default function Container(props) {
  
  const isAuthorized = GetAuth.GetStoreAuthValid();
  const routeOrigin = GetRoute.RouteOrigin();
  const checkPage1 = (routeOrigin === '') ? 'home' : routeOrigin;
  const checkPage2 = (routeOrigin === '') ? 'main' : 'sub';
  const isPage1 = 'page-' + checkPage1;
  const isPage2 = 'page-' + checkPage2;
  const isLoggedIn = (isAuthorized) ? 'logged-in' : '';
  const isDevice = 'device-' + browserName.toLowerCase().replace(' ', '-');

  return (
    <React.Fragment>
      <div className={`container-fluid page ${isPage1} ${isPage2} ${isLoggedIn} ${isDevice}`}>
        {props.children}
      </div>
    </React.Fragment>
  )

}