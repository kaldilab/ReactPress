import React from 'react';
import { Helmet } from 'react-helmet-async';
import Options from 'settings/Options';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';

export default function Head() {

  const isRouteHome = GetRoute.IsRouteHome();
  const isRouteView = GetRoute.IsRouteView();
  const isRouteEdit = GetRoute.IsRouteEdit();
  const isRouteAdd = GetRoute.IsRouteAdd();
  const isRouteCPTView = GetRoute.IsRouteCPTView();
  const routeSlug = () => {
    if (isRouteView || isRouteEdit || isRouteCPTView) {
      return GetRoute.RouteSlug('last', 3);
    } else if (isRouteAdd) {
      return GetRoute.RouteSlug('last', 2);
    } else {
      return GetRoute.RouteSlug();
    }
  }
  const menuLabel = GetMenu.MenuLabel(routeSlug());
  const appTitle = Options.appTitle;
  const appMixTitle = (isRouteHome) ? appTitle : menuLabel + ' | ' + appTitle;
  const appMetaTitle = appTitle;
  const appDescription = Options.appDescription;
  const appSubject = Options.appSubject;
  const appEmail = Options.appEmail;
  const appImage = Options.appImage;
  const appUrl = Options.appUrl;
  const appAuthor = Options.appAuthor;
  const appKeywords = Options.appKeywords;
  const appCopyright = Options.appCopyright;
  const appPublisher = Options.appPublisher;
  const appDistribution = Options.appDistribution;
  const appRobots = Options.appRobots;
  const appPublic = process.env.PUBLIC_URL;
  const appPath = (isRouteHome) ? (Options.appUrl + appPublic)  : (Options.appUrl + window.location.pathname);
  const appType = (isRouteView) ? 'article' : 'website';

  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <title>{appMixTitle}</title>
        <meta name="Title" content={appMetaTitle} />
        <meta name="Description" content={appDescription} />
        <meta name="Subject" content={appSubject} />
        <meta name="Author" content={appAuthor} />
        <meta name="Keywords" content={appKeywords} />
        <meta name="Reply-To(Email)" content={appEmail} />
        <meta name="Copyright" content={appCopyright} />
        <meta name="Publisher" content={appPublisher} />
        <meta name="Distribution" content={appDistribution} />
        <meta name="Robots" content={appRobots} />
        <meta name="google-site-verification" content="" />
        <meta name="naver-site-verification" content="" />
        <meta property="og:title" content={appMixTitle} />
        <meta property="og:image" content={appUrl + appImage} />
        <meta property="og:site_name" content={appMetaTitle} />
        <meta property="og:description" content={appDescription} />
        <meta property="og:type" content={appType} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:url" content={appPath} />
        <meta name="twitter:image" content={appUrl + appImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={appMixTitle} />
        <meta name="twitter:description" content={appDescription} />
        <link rel="canonical" href={appUrl + appPublic} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${appPublic}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${appPublic}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${appPublic}/favicon-16x16.png`} />
        <link rel="manifest" href={`${appPublic}/site.webmanifest`} />
        <link rel="mask-icon" href={`${appPublic}/safari-pinned-tab.svg`} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
    </React.Fragment>
  );

}