import React from 'react';

export function CTCardColumn(props) {
  const { columnClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`card-columns ${columnClass}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTCardColumnItem(props) {
  const { itemClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`card ${itemClass}`}>
        <div className="card-figure">
          <img src={props.image} className="card-img-top" alt={props.title} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.excerpt}</p>
          <span className="badge badge-primary">{props.category}</span>
        </div>
        <div className="card-footer">
          <small className="text-muted">{props.date}</small>
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTCardColumnItemNone(props) {
  return (
    <React.Fragment>
      <div className="card none">{props.text}</div>
    </React.Fragment>
  )
}