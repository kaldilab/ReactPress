import React from 'react';
import { Link } from 'react-router-dom';

export function CTJumbotron(props) {
  const { wrapperClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`jumbotron ${wrapperClass}`}>
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">{props.lead}</p>
        <hr className="my-4" />
        <p>{props.excerpt}</p>
        <Link to={props.link} className="btn btn-primary btn-lg">{props.buttonTitle}</Link>
      </div>
    </React.Fragment >
  )
}