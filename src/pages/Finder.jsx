import React from 'react';
import Article from 'layouts/Article';
import SearchAll from 'templates/Search/SearchAll';

export default function Page() {

  return (
    <React.Fragment>
      <Article>
        <SearchAll
          type={'card'}
          col={3}
          perPage={12}
        />
      </Article>
    </React.Fragment>
  )

}