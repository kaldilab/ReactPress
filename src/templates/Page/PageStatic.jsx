import React from 'react';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';

export default function PageStatic(props) {

  const routeSlug = GetRoute.RouteSlug();

  return (
    <React.Fragment>
      <h3 className="mb-3">{GetMenu.MenuLabel(routeSlug)}</h3>
      <p className="mb-5 font-italic text-right text-warning">하드코딩으로 작성하는 정적인 고정페이지입니다.</p>
      {props.children}
    </React.Fragment>
  )

}