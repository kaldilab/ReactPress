import React from 'react';
import Article from 'layouts/Article';
import PostEdit from "templates/Post/PostEdit";

export default function Page() {

  return (
    <React.Fragment>
      <Article>
        <PostEdit />
      </Article>
    </React.Fragment>
  )

}