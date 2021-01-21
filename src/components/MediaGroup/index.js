import React from 'react';

export function CTMediaGroup(props) {
  const { groupClass = '' } = props;
  return (
    <React.Fragment>
      <ul className={`list-unstyled ${groupClass}`}>
        {props.children}
      </ul>
    </React.Fragment>
  )
}

export function CTMediaGroupItem(props) {
  return (
    <React.Fragment>
      <li className="media">
        <div className="media-figure mr-3">
          <img className="media-image" src={props.image} alt={props.title} />
        </div>
        <div className="media-body">
          <h5 className="mt-0 mb-1">{props.title}</h5>
          <p>{props.excerpt}</p>
          {
            (props.children) && props.children
          }
        </div>
      </li>
    </React.Fragment>
  )
}

export function CTMediaGroupItemNone(props) {
  return (
    <React.Fragment>
      <li className="media none">{props.text}</li>
    </React.Fragment>
  )
}