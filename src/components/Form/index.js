import React from 'react';

export function CTForm(props) {
  const { formClass = '' } = props;
  return (
    <React.Fragment>
      <form className={`form ${formClass}`} onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </React.Fragment>
  )
}

export function CTFormInner(props) {
  const { innerClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`form-inner ${innerClass}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export function CTFormButton(props) {
  const { groupClass = '' } = props;
  const { buttonClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`form-group ${groupClass}`}>
        <input className={`btn btn-block ${buttonClass}`} type={props.type} onClick={props.onClick} onSubmit={props.onSubmit} value={props.value} />
      </div>
    </React.Fragment>
  )
}

export function CTFormText(props) {
  const { groupClass = '' } = props;
  const { labelClass = '' } = props;
  const { controlClass = '' } = props;
  const { feedbackClass = 'invalid' } = props;
  return (
    <React.Fragment>
      <div className={`form-group ${groupClass}`}>
        <label className={`form-label ${labelClass}`} htmlFor={props.id}>{props.label}</label>
        <input className={`form-control ${controlClass}`} id={props.id} name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
        {
          (props.feedback)
          &&
          <div className={`${feedbackClass}-feedback`}>{props.feedbackMessage}</div>
        }
      </div>
    </React.Fragment>
  )
}

export function CTFormTextarea(props) {
  const { groupClass = '' } = props;
  const { labelClass = '' } = props;
  const { controlClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`form-group ${groupClass}`}>
        <label className={`form-label ${labelClass}`} htmlFor={props.id}>{props.label}</label>
        <textarea className={`form-control ${controlClass}`} id={props.id} name={props.name} rows={props.rows} placeholder={props.placeholder} onChange={props.onChange} value={props.value}></textarea>
      </div>
    </React.Fragment>
  )
}

export function CTFormSelect(props) {
  const { groupClass = '' } = props;
  const { labelClass = '' } = props;
  const { controlClass = '' } = props;
  return (
    <React.Fragment>
      <div className={`form-group ${groupClass}`}>
        <label className={`form-label ${labelClass}`} htmlFor={props.id}>{props.label}</label>
        <select className={`form-control ${controlClass}`} id={props.id} name={props.name} onChange={props.onChange} value={props.value}>
          {props.children}
        </select>
      </div>
    </React.Fragment>
  )
}

export function CTFormFeedback(props) {
  const { feedbackClass = 'invalid' } = props;
  return (
    <React.Fragment>
      {
        (props.feedback)
        &&
        <div className={`d-block ${feedbackClass}-feedback`}>{props.feedbackMessage}</div>
      }
    </React.Fragment>
  )
}