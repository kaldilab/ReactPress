import React from 'react';
import { Link } from 'react-router-dom';

export function CTButton(props) {
  const { buttonClass = '' } = props;
  const { target = '_self' } = props;
  return (
    <React.Fragment>
      {
        (props.type === 'basic')
        &&
        <button id={props.buttonId} className={`btn ${buttonClass}`} onClick={props.onClick} onSubmit={props.onSubmit}>{props.title}</button>
      }
      {
        (props.type === 'input')
        &&
        <input id={props.buttonId} className={`btn ${buttonClass}`} type={props.type} onClick={props.onClick} onSubmit={props.onSubmit} value={props.value} />
      }
      {
        (props.type === 'anchor')
        &&
        <Link to={props.link} id={props.buttonId} className={`btn ${buttonClass}`} target={target} onClick={props.onClick} onSubmit={props.onSubmit}>{props.title}</Link>
      }
    </React.Fragment>
  )
}

export function CTButtonBasic(props) {
  const { wrapperClass = '' } = props;
  const { buttonClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`clearfix ${wrapperClass}`}>
        <button id={props.buttonId} className={`btn ${buttonClass}`} onClick={props.onClick} onSubmit={props.onSubmit}>{props.title}</button>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTButtonInput(props) {
  const { wrapperClass = '' } = props;
  const { buttonClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`clearfix ${wrapperClass}`}>
        <input id={props.buttonId} className={`btn ${buttonClass}`} type={props.type} onClick={props.onClick} onSubmit={props.onSubmit} value={props.value} />
        {props.children}
      </div>
    </React.Fragment>
  )
}


export function CTButtonAnchor(props) {
  const { wrapperClass = '' } = props;
  const { buttonClass = '' } = props;
  const { target = '_self' } = props;
  return (
    <React.Fragment>
      <div className={`clearfix ${wrapperClass}`}>
        <Link to={props.link} id={props.buttonId} className={`btn ${buttonClass}`} target={target} onClick={props.onClick} onSubmit={props.onSubmit}>{props.title}</Link>
        {props.children}
      </div>
    </React.Fragment>
  )
}