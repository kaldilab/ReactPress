import React from 'react';
import Article from 'layouts/Article';
import PostAdd from "templates/Post/PostAdd";

export default function Page() {

  return (
    <React.Fragment>
      <Article>
        <PostAdd />
      </Article>
    </React.Fragment>
  )

}