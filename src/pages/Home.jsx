import React from 'react';
import HomeFeaturedPost from 'templates/Home/HomeFeaturedPost';
import HomeFeaturedCPT from 'templates/Home/HomeFeaturedCPT';

export default function Page() {

  return (
    <React.Fragment>
      <HomeFeaturedPost
        type={'slider'}
        sectionClass={'main-front__visual mb-5'}
        srTitle={'슬라이더'}
        category={''}
        perPage={3}
      />
      <HomeFeaturedPost
        type={'card'}
        col={4}
        sectionClass={'main-front__all mb-5'}
        category={''}
        perPage={3}
      >
        <h3 className="mb-5 text-center">Community</h3>
      </HomeFeaturedPost>
      <div className="main-front__cpt row">
        <HomeFeaturedPost
          type={'list'}
          sectionClass={'col-md-6 mb-5'}
          category={'people'}
          perPage={2}
        >
          <h3 className="mb-5">People</h3>
        </HomeFeaturedPost>
        <HomeFeaturedPost
          type={'list'}
          sectionClass={'col-md-6 mb-5'}
          category={'nature'}
          perPage={2}
        >
          <h3 className="mb-5">Nature</h3>
        </HomeFeaturedPost>
      </div>
      <HomeFeaturedCPT
        type={'card'}
        col={3}
        sectionClass={'main-front__all mb-5'}
        cpt={'center'}
        perPage={4}
      >
        <h3 className="mb-5 text-center">Center</h3>
      </HomeFeaturedCPT>
      <div className="main-front__cpt row">
        <HomeFeaturedCPT
          type={'list'}
          sectionClass={'col-md-6 mb-5'}
          cpt={'photo'}
          perPage={2}
        >
          <h3 className="mb-5">Photo</h3>
        </HomeFeaturedCPT>
        <HomeFeaturedCPT
          type={'list'}
          sectionClass={'col-md-6 mb-5'}
          cpt={'product'}
          perPage={2}
        >
          <h3 className="mb-5">Product</h3>
        </HomeFeaturedCPT>
      </div>
    </React.Fragment>
  )

}