import React from 'react';
import PostListSingle from 'templates/Post/PostListSingle';

export default function Page() {

  return (
    <React.Fragment>
      <PostListSingle
        type={'table'}
        perPage={5}
      />
    </React.Fragment>
  )

}