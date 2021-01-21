import React from 'react';
import { Link } from 'react-router-dom';

export function CTListDeck(props) {
  const { groupClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`list-group ${groupClass}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTListDeckItem(props) {
  return (
    <React.Fragment>
      <Link to={props.link} className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{props.title}</h5>
          <small>{props.date}</small>
        </div>
        <p className="mb-1">{props.excerpt}</p>
        <span className="badge badge-primary">{props.category}</span>
        {
          (props.children) && props.children
        }
      </Link>
    </React.Fragment>
  )
}

export function CTListDeckItemNone(props) {
  return (
    <React.Fragment>
      <div className="list-group-item none">{props.text}</div>
    </React.Fragment>
  )
}