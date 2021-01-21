import React from 'react';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';

export default function Bottom(props) {

  const routeOrigin = GetRoute.RouteOrigin();
  
  return (
    <React.Fragment>
      <div className="main__bottom">
        <h4>{GetMenu.MenuLabel(routeOrigin)}</h4>
      </div>
    </React.Fragment>
  )

}