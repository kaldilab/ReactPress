import React from 'react';

export function CTLoadingDiv(props) {
  return (
    <React.Fragment>
      <div className="loading loading-div">
        <div><span></span><span></span><span></span><span></span></div>
        <i>로딩중입니다.</i>
      </div>
    </React.Fragment>
  )
}

export function CTLoadingTr(props) {
  return (
    <React.Fragment>
      <tr className="loading loading-tr">
        <td colSpan={props.colspan}>
          <div><span></span><span></span><span></span><span></span></div>
          <i>로딩중입니다.</i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export function CTLoadingLi(props) {
  return (
    <React.Fragment>
      <li className="loading loading-li">
        <div><span></span><span></span><span></span><span></span></div>
        <i>로딩중입니다.</i>
      </li>
    </React.Fragment>
  )
}

export function CTLoadingFloat(props) {
  return (
    <React.Fragment>
      <div className="loading loading-float">
        <div><span></span><span></span><span></span><span></span></div>
        <i>로딩중입니다.</i>
      </div>
    </React.Fragment>
  )
}