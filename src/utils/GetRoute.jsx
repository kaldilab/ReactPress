import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';

// RouteDebug
export function RouteDebug() {
  console.log('Location : ', useLocation());
  console.log('RouteMatch : ', useRouteMatch());
  console.log('History : ', useHistory());
}

// RouteOrigin
export function RouteOrigin() {
  const { pathname } = useLocation();
  const firstPathname = pathname.split('/');
  return firstPathname[1];
}

// RouteSlug
export function RouteSlug(level = 'last', order = 1) {
  const { pathname } = useLocation();
  const firstPathname = pathname.split('/');
  const lastPathname = firstPathname.filter((item, index) =>
    index === (firstPathname.length - order));
  if (level === 'first') {
    return firstPathname[order];
  } else if (level === 'last') {
    return lastPathname.join();
  }
}

// RouteArray
export function RouteArray() {
  const { pathname } = useLocation();
  const arrayPathname = pathname.split('/');
  return arrayPathname;
}

// RouteParams
export function RouteParams(key) {
  const { params } = useRouteMatch();
  const value = params[key];
  return value;
}

// RouteUrl
export function RouteUrl(key = 'pathname') {
  const { pathname } = useLocation();
  const { url } = useRouteMatch();
  if (key === 'pathname') {
    return pathname;
  } else if (key === 'url') {
    return url;
  }
}

// RouteUrlMatch
export function RouteUrlMatch() {
  const { path } = useRouteMatch();
  return path;
}

// RouteSearch
export function RouteSearch() {
  const { search } = useLocation();
  return search;
}

// RouteState
export function RouteState() {
  const { state } = useLocation();
  return state;
}

// RouteHistory
export function RouteHistory() {
  const history = useHistory();
  return history;
}

// IsRouteHome
export function IsRouteHome() {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return true;
  }
}

// IsRouteView
export function IsRouteView() {
  const { pathname } = useLocation();
  const arrayPathname = pathname.split('/');
  if (arrayPathname.find(item => item === '_view')) {
    return true;
  }
}

// IsRouteEdit
export function IsRouteEdit() {
  const { pathname } = useLocation();
  const arrayPathname = pathname.split('/');
  if (arrayPathname.find(item => item === '_edit')) {
    return true;
  }
}

// IsRouteAdd
export function IsRouteAdd() {
  const { pathname } = useLocation();
  const arrayPathname = pathname.split('/');
  if (arrayPathname.find(item => item === '_add')) {
    return true;
  }
}

// IsRouteCPTView
export function IsRouteCPTView() {
  const { pathname } = useLocation();
  const arrayPathname = pathname.split('/');
  if (arrayPathname.find(item => item === '_cpt_view')) {
    return true;
  }
}