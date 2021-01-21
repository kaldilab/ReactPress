import React from 'react';

export function CTInputGroupText(props) {
  const { groupClass = '' } = props;
  const { controlClass = '' } = props;
  const { buttonClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`input-group ${groupClass}`}>
        <input className={`form-control ${controlClass}`} aria-label={props.controlLabel} type={props.controlType} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
        <div className="input-group-append">
          <button className={`btn btn-sm ${buttonClass}`} type={props.buttonType}>{props.buttonLabel}</button>
        </div>
      </div>
    </React.Fragment>
  )
}