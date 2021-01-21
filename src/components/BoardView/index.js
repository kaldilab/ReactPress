import React from 'react';
import { Link } from 'react-router-dom';

export function CTBoardView(props) {
  const { viewClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`view ${viewClass}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTBoardViewHead(props) {
  return (
    <React.Fragment>
      <div className="view-head">
        <h2 className="view-title">{props.title}</h2>
        <h6 className="view-category">{props.category}</h6>
        <p className="view-date">{props.date}</p>
        <p className="view-author">{props.author}</p>
        <p className="view-tag">{props.tag}</p>
      </div>
    </React.Fragment>
  )
}

export function CTBoardViewVisual(props) {
  return (
    <React.Fragment>
      <div className="view-visual">
        <div className="view-figure">
          <img className="view-image" src={props.url} alt={props.alt} />
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTBoardViewBody(props) {
  return (
    <React.Fragment>
      <div className="view-body">
        <div className="view-content" dangerouslySetInnerHTML={props.content}>
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTBoardViewFoot(props) {
  return (
    <React.Fragment>
      <div className="view-foot">
        <div className="view-goto">
          <Link to={props.link} className="btn btn-primary" onClick={props.onClick}>{props.button}</Link>
        </div>
      </div>
    </React.Fragment>
  )
}