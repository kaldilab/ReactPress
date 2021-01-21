import React from 'react';
import CPTList from 'templates/CPT/CPTList';

export default function Page() {

  return (
    <React.Fragment>
      <CPTList
        type={'card'}
        col={4}
        perPage={6}
      />
    </React.Fragment>
  )

}