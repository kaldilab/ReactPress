import React from 'react';
import PostListLoadMore from 'templates/Post/PostListLoadMore';

export default function Page() {

  return (
    <React.Fragment>
      <PostListLoadMore
        type={'card'}
        col={6}
        perPage={6}
      />
    </React.Fragment>
  )

}