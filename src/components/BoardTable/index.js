import React from 'react';
import { Link } from 'react-router-dom';

export function CTBoardTable(props) {
  const { tableClass = '' } = props;
  const { theadClass = '' } = props;
  const { tbodyClass = '' } = props;
  return (
    <React.Fragment>
      <table className={`table mt-3 ${tableClass}`}>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '*' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead className={`${theadClass}`}>
          <tr>
            <td>번호</td>
            <td>제목</td>
            <td>날짜</td>
          </tr>
        </thead>
        <tbody className={`${tbodyClass}`}>
          {props.children}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export function CTBoardTableItem(props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.order}</td>
        <td>
          <Link to={props.link}><span>[{props.category}]</span> {props.title}</Link>
        </td>
        <td>{props.date}</td>
      </tr>
    </React.Fragment>
  )
}

export function CTBoardTableItemSticky(props) {
  return (
    <React.Fragment>
      <tr>
        <th>{props.sticky}</th>
        <th>
        <Link to={props.link}><span>[{props.category}]</span> {props.title}</Link>
        </th>
        <th>{props.date}</th>
      </tr>
    </React.Fragment>
  )
}

export function CTBoardTableItemNone(props) {
  return (
    <React.Fragment>
      <tr>
        <td colSpan="3" className="none">{props.text}</td>
      </tr>
    </React.Fragment>
  )
}