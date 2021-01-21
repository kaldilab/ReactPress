import React from 'react';
import { Link } from 'react-router-dom';

export function CTCardDeck(props) {
  const { rowClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`row ${rowClass}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTCardDeckItem(props) {
  return (
    <React.Fragment>
      <div className={`col-md-${props.col} mb-4`}>
        <Link className="card" to={props.link}>
          <div className="card-figure">
            <img src={props.image} className="card-img-top" alt={props.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <div className="card-text">{props.excerpt}</div>
            <span className="badge badge-primary">{props.category}</span>
            {
              (props.children) && props.children
            }
          </div>
          <div className="card-footer">
            <small className="text-muted">{props.date}</small>
          </div>
        </Link>
      </div>
    </React.Fragment>
  )
}

export function CTCardDeckItemNone(props) {
  return (
    <React.Fragment>
      <div className="col-md-12 none">{props.text}</div>
    </React.Fragment>
  )
}