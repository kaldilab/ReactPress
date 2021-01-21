import React from 'react';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';
import * as GetAsset from 'utils/GetAsset';

export default function Top(props) {

  const routeOrigin = GetRoute.RouteOrigin();
  const topImage = () => {
    if (routeOrigin === 'hello') {
      return 'sample1.jpg';
    } else if (routeOrigin === 'about') {
      return 'sample2.jpg';
    } else if (routeOrigin === 'community') {
      return 'sample3.jpg';
    } else if (routeOrigin === 'square') {
      return 'sample4.jpg';
    } else if (routeOrigin === 'story') {
      return 'sample5.jpg';
    } else {
      return 'default.jpg';
    }
  }

  return (
    <React.Fragment>
      <div className="main__top" style={{ backgroundImage: `url(${GetAsset.AssetImage(topImage())})` }}>
        <h2>{GetMenu.MenuLabel(routeOrigin)}</h2>
      </div>
    </React.Fragment>
  )

}