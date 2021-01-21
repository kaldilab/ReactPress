import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menus from 'settings/Menus';
import Top from 'layouts/Top';
import Bottom from 'layouts/Bottom';
import Breadcrumb from 'layouts/Breadcrumb'
import * as GetMenu from 'utils/GetMenu';
import * as GetRoute from 'utils/GetRoute';
import * as GetAuth from 'utils/GetAuth';

export default function Routes() {
  const isAuthorized = GetAuth.GetStoreAuthValid();
  const redirectByAuth = (isAuthorized) ? GetMenu.MenuUrl('user') : GetMenu.MenuUrl('login');
  return (
    <Switch>
      {
        Menus.map((item, index) => {
          const isItemAuth = item.authorization;
          return (
            (isItemAuth)
              ?
              <Route
                key={index}
                exact
                path={item.path}
                render={({ location }) => <Redirect to={{ pathname: redirectByAuth, state: { from: location.pathname } }} />}
              />
              :
              <Route
                key={index}
                exact
                path={item.path}
              >
                {
                  (item.slug === 'home')
                    ?
                    <item.component />
                    :
                    <React.Fragment>
                      <Top />
                      <Breadcrumb />
                      <item.component />
                      <Bottom />
                    </React.Fragment>
                }
              </Route>
          )
        })
      }
      <Route
        exact
        path={'/*'}
        render={() => <Redirect to="/notfound" />}
      />
    </Switch>
  )
}

export function NestedRoutes() {
  const routeOrigin = GetRoute.RouteOrigin();
  const routeOriginUrl = '/' + routeOrigin;
  const isAuthorized = GetAuth.GetStoreAuthValid();
  const redirectByAuth = (isAuthorized) ? GetMenu.MenuUrl('user') : GetMenu.MenuUrl('login');
  return (
    <Switch>
      {
        Menus.map(item => {
          const isSubmenu = 'submenu' in item;
          const getSubmenu = (parentMenu, inheritPath) => {
            const parentPath = inheritPath;
            return (
              [
                parentMenu.submenu.map((item, index) => {
                  const isChildrenSubmenu = 'submenu' in item;
                  const isChildrenItemAuth = item.authorization;
                  const joinPath = parentPath + '/' + item.slug;
                  return (
                    [
                      (index === 0)
                      &&
                      <Route
                        key={index}
                        exact
                        path={parentPath}
                        render={() => <Redirect to={joinPath} />}
                      />
                      ,
                      (isChildrenSubmenu)
                        ?
                        getSubmenu(item, joinPath)
                        :
                        (
                          (isChildrenItemAuth)
                            ?
                            <Route
                              key={index}
                              exact
                              path={joinPath}
                              render={({ location }) => <Redirect to={{ pathname: redirectByAuth, state: { from: location.pathname } }} />}
                            />
                            :
                            <Route
                              key={index}
                              exact
                              path={joinPath}
                              component={item.component}
                            />
                        )
                    ]
                  )
                })
                ,
                <Route
                  exact
                  path={parentPath + '/*'}
                  render={() => <Redirect to="/notfound" />}
                />
              ]
            )
          }
          return (
            (isSubmenu && (item.slug === routeOrigin))
            &&
            getSubmenu(item, routeOriginUrl)
          )
        })
      }
    </Switch>
  )
}