import React from 'react';
import Article from 'layouts/Article';
import PostView from "templates/Post/PostView";
import CPTView from "templates/CPT/CPTView";
import * as GetRoute from 'utils/GetRoute';

export default function Page() {

  const isRouteCPTView = GetRoute.IsRouteCPTView();

  return (
    <React.Fragment>
      <Article>
        {
          (isRouteCPTView)
            ?
            <CPTView />
            :
            <PostView />
        }
      </Article>
    </React.Fragment>
  )

}