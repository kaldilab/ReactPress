import React from 'react';

export function CTCardMasonry(props) {
  return (
    <React.Fragment>
      <div className="grid-sizer"></div>
      <div className="gutter-sizer"></div>
      {props.children}
    </React.Fragment>
  )
}

export function CTCardMasonryItem(props) {
  return (
    <React.Fragment>
      <div className="card masonry-item">
        <div className="card-figure">
          <img src={props.image} className="card-img-top" alt={props.title} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.excerpt}</p>
          <span className="badge badge-primary">{props.category}</span>
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTCardMasonryItemNone(props) {
  return (
    <React.Fragment>
      <div className="card-masonry none">{props.text}</div>
    </React.Fragment>
  )
}