import React from 'react';

export function CTCardGroup(props) {
  const { rowClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`row ${rowClass}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTCardGroupItem(props) {
  return (
    <React.Fragment>
      <div className={`col-md-${props.col} mb-4`}>
        <div className="card">
          <div className="card-figure">
            <img src={props.image} className="card-img-top" alt={props.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.excerpt}</p>
            {
              (props.children) && props.children
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTCardGroupItemNone(props) {
  return (
    <React.Fragment>
      <div className="col-md-12 none">{props.text}</div>
    </React.Fragment>
  )
}