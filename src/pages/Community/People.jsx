import React from 'react';
import PostListSingle from 'templates/Post/PostListSingle';

export default function Page() {

  return (
    <React.Fragment>
      <PostListSingle
        type={'card'}
        col={3}
        perPage={8}
      />
    </React.Fragment>
  )

}