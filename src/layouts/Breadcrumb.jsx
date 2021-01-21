import React from 'react';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';

export default function Breadcrumb(props) {

  const routeArray = GetRoute.RouteArray();
  const isRouteView = GetRoute.IsRouteView();
  const isRouteEdit = GetRoute.IsRouteEdit();
  const isRouteAdd = GetRoute.IsRouteAdd();
  const isRouteCPTView = GetRoute.IsRouteCPTView();

  if (isRouteView || isRouteEdit || isRouteCPTView) {
    routeArray.splice(-2)
  } else if (isRouteAdd) {
    routeArray.splice(-1)
  }

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {
            routeArray.map((item, index) => {
              const itemName = (index === 0) ? 'HOME' : GetMenu.MenuLabel(item);
              const isFirst = (index === 0) ? 'home' : '';
              const isLast = (index === (routeArray.length - 1)) ? 'active text-primary' : '';
              return (
                <li className={`breadcrumb-item ${isFirst} ${isLast}`} key={index}>{itemName}</li>
              )
            })
          }
        </ol>
      </nav>
    </React.Fragment>
  )

}