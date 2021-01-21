import React from 'react';
import Article from 'layouts/Article';
import PageNotFound from "templates/Page/PageNotFound";

export default function Page() {

  return (
    <React.Fragment>
      <Article>
        <PageNotFound />
      </Article>
    </React.Fragment>
  )

}