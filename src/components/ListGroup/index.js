import React from 'react';

export function CTListGroup(props) {
  const { groupClass = '' } = props;
  return (
    <React.Fragment>
      <ul className={`list-group ${groupClass}`}>
        {props.children}
      </ul>
    </React.Fragment>
  )
}

export function CTListGroupItem(props) {
  return (
    <React.Fragment>
      <li className="list-group-item">
        <h4 className="h4">{props.title}</h4>
        {
          (props.excerpt) && <div>{props.excerpt}</div>
        }
        {
          (props.image) && <div><img src={props.image} alt={props.title} /></div>
        }
        {
          (props.children) && props.children
        }
      </li>
    </React.Fragment>
  )
}

export function CTListGroupItemNone(props) {
  return (
    <React.Fragment>
      <li className="list-group-item none">{props.text}</li>
    </React.Fragment>
  )
}