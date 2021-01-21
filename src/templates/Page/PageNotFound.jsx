import React from 'react';
import Section from 'layouts/Section';

export default function PageNotFound(props) {

  return (
    <React.Fragment>
      <Section sectionClass={'section not-found'}>
        <h2>404 | 페이지를 찾을 수 없습니다.</h2>
      </Section>
    </React.Fragment>
  );

}