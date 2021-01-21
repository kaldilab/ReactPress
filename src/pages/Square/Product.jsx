import React from 'react';
import CPTList from 'templates/CPT/CPTList';

export default function Page() {

  return (
    <React.Fragment>
      <CPTList
        type={'table'}
        perPage={8}
      />
    </React.Fragment>
  )

}