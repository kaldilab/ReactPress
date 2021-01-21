import React from 'react';
import PostListSingle from 'templates/Post/PostListSingle';

export default function Page() {

  return (
    <React.Fragment>
      <PostListSingle
        type={'card'}
        col={12}
        perPage={4}
      />
    </React.Fragment>
  )

}