import React from 'react';
import { Link } from 'react-router-dom';

export function CTNavs(props) {
  const { navClass = '' } = props;
  return (
    <React.Fragment>
      <ul className={`nav nav-pills ${navClass}`}>
        {props.children}
      </ul>
    </React.Fragment>
  )
}

export function CTNavsItem(props) {
  return (
    <React.Fragment>
      <li className="nav-item">
        <Link to={props.link} className={`nav-link ${props.active}`}>{props.title}</Link>
      </li>
    </React.Fragment>
  )
}