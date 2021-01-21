import React from 'react';
import { NestedRoutes } from 'settings/Routes';

export default function Article(props) {

  return (
    <React.Fragment>
      <article className="main__article article">
        {
          (props.children)
            ?
            props.children
            :
            <NestedRoutes />
        }
      </article>
    </React.Fragment>
  )

}