import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Masonry from 'react-masonry-component';
import Unsplash from 'templates/Unsplash/Unsplash';
import Section from 'layouts/Section';
import * as CardMasonry from 'components/CardMasonry';
import * as GetRoute from 'utils/GetRoute';
import * as GetUtils from 'utils/GetUtils';
import * as GetMenu from 'utils/GetMenu';

export default function UnsplashList(props) {

  const routeSlug = GetRoute.RouteSlug();
  const routeHistory = GetRoute.RouteHistory();
  const routeSearch = GetRoute.RouteSearch();
  const searchQuery = GetUtils.GetParse('query', routeSearch);
  const searchQueryPaging = searchQuery.paging ? searchQuery.paging : 1;
  const [imageCurrentPage, setImageCurrentPage] = useState(Number(searchQueryPaging));
  const [imageForcePage, setImageForcePage] = useState(searchQueryPaging - 1);
  const imageType = props.type;
  const imageTerms = props.terms;
  const imageOrderBy = props.orderBy;
  const imageOrientation = props.orientation;
  const imageColor = props.color;
  const imagePerPage = props.perPage;
  const imagePage = imageCurrentPage;
  const imageTotal = 50;
  const UI = Unsplash(imageType, imageTerms, imageOrderBy, imageOrientation, imageColor, imagePage, imagePerPage);
  const unsplashImages = UI[0];
  const unsplashLoading = UI[1];
  const handlePagingClick = (event) => {
    handlePagingPush(event.selected + 1);
    setImageCurrentPage(event.selected + 1);
    setImageForcePage(event.selected);
  }
  const handlePagingPush = (value) => {
    ('paging' in searchQuery) && delete searchQuery['paging'];
    const queryOld = searchQuery;
    const queryOldString = GetUtils.GetStringfy('query', queryOld);
    const queryObject = { paging: value };
    const queryObjectString = GetUtils.GetStringfy('query', queryObject);
    const queryAll = (Object.keys(queryOld).length) ? (queryOldString + '&' + queryObjectString) : queryObjectString;
    routeHistory.push({
      search: queryAll,
    });
  }
  const masonryOptions = {
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    itemSelector: '.card',
    percentPosition: true,
    transitionDuration: 400,
  };

  return (
    <React.Fragment>
      <h3 className="mb-5">{GetMenu.MenuLabel(routeSlug)}</h3>
      <p className="mb-5 font-italic text-right text-warning"><a className="text-warning" href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Usplash<i className="icofont icofont-external-link"></i></a>의 특정 토픽이나 검색 이미지를 Masonry 방식으로 출력하는 페이지입니다.</p>
      <Section loading={unsplashLoading} sectionClass={'section'} srTitle={GetMenu.MenuLabel(routeSlug)}>
        <Masonry
          options={masonryOptions}
        >
          <CardMasonry.CTCardMasonry>
            {
              (unsplashImages.length > 0)
                ?
                unsplashImages
                  .map((item, index) => {
                    return (
                      <CardMasonry.CTCardMasonryItem
                        key={index}
                        image={item.urls.regular}
                        category={item.terms}
                        title={item.id}
                        excerpt={(item.description) ? item.description : 'Description is none.'}
                      />
                    )
                  })
                :
                <CardMasonry.CTCardMasonryItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </CardMasonry.CTCardMasonry>
        </Masonry>
        {
          (imageTotal > 0)
          &&
          <ReactPaginate
            pageCount={Math.ceil(imageTotal / imagePerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            previousLabel={'이전'}
            nextLabel={'다음'}
            breakLabel={'・'}
            onPageChange={handlePagingClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            activeClassName={'active'}
            activeLinkClassName={''}
            disabledClassName={'disabled'}
            previousClassName={'page-item prev'}
            nextClassName={'page-item next'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            forcePage={imageForcePage}
          />
        }
      </Section>
    </React.Fragment>
  )

}