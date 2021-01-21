import React from 'react';
import * as Loading from 'components/Loading';

export default function Section(props) {

  return (
    <React.Fragment>
      {
        (props.loading)
          ?
          <Loading.CTLoadingDiv />
          :
          <section className={props.sectionClass}>
            {
              (props.srTitle)
              &&
              <h4 className="sr-only">{props.srTitle}</h4>
            }
            {props.children}
          </section>
      }
    </React.Fragment>
  )

}