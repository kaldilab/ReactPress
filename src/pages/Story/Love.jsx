import React from 'react';
import UnsplashList from 'templates/Unsplash/UnsplashList';

export default function Page() {

  return (
    <React.Fragment>
      <UnsplashList
        type={'topics'}
        terms={'people'}
        orderBy={'latest'}
        orientation={null}
        color={null}
        perPage={10}
      />
    </React.Fragment>
  )

}