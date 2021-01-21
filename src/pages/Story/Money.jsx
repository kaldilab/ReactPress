import React from 'react';
import PostListMultiple from 'templates/Post/PostListMultiple';

export default function Page() {

  return (
    <React.Fragment>
      <PostListMultiple
        type={'card'}
        col={4}
        perPage={6}
      />
    </React.Fragment>
  )

}