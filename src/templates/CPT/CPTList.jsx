import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';
import { ApiCPT } from 'settings/Api';
import Section from 'layouts/Section';
import * as BoardTable from 'components/BoardTable';
import * as BoardCard from 'components/BoardCard';
import * as Form from 'components/Form';
import * as InputGroup from 'components/InputGroup';
import * as Loading from 'components/Loading';
import * as GetRoute from 'utils/GetRoute';
import * as GetUtils from 'utils/GetUtils';
import * as GetStorage from 'utils/GetStorage';
import * as GetMenu from 'utils/GetMenu';
import * as GetDate from 'utils/GetDate';

export default function CPTList(props) {

  const isMounted = useRef(false);
  const postsPerPage = props.perPage;
  const routeSlug = GetRoute.RouteSlug();
  const routeUrl = GetRoute.RouteUrl();
  const routeUrlReplace = routeUrl.replace(/\//gi, '_');
  const routeHistory = GetRoute.RouteHistory();
  const routeSearch = GetRoute.RouteSearch();
  const searchQuery = GetUtils.GetParse('query', routeSearch);
  const searchQueryLookup = searchQuery.lookup ? searchQuery.lookup : '';
  const searchQueryPaging = searchQuery.paging ? searchQuery.paging : 1;
  const [postsCurrentPage, setPostsCurrentPage] = useState(Number(searchQueryPaging));
  const [postsAll, setPostsAll] = useState([]);
  const [postsAllTotal, setPostsAllTotal] = useState([]);
  const [postsForcePage, setPostsForcePage] = useState(searchQueryPaging - 1);
  const [lookupValue, setLookupValue] = useState(searchQueryLookup);
  const [newLookupValue, setNewLookupValue] = useState(searchQueryLookup);
  const [isLoadingSection, setIsLoadingSection] = useState(true);
  const [isLoadingPart, setIsLoadingPart] = useState(true);
  const debounceTimer = 700;
  const debouncedLookupValue = useRef(debounce(newValue => setNewLookupValue(newValue), debounceTimer)).current;
  const handleLookupChange = (event) => {
    const { value: newValue } = event.target;
    setPostsCurrentPage(1);
    setPostsForcePage(0);
    setLookupValue(newValue);
    debouncedLookupValue(newValue);
    handleLookupPush(newValue);
    setIsLoadingPart(true);
  }
  const handleLookupSubmit = (event) => {
    event.preventDefault();
    handleLookupPush(lookupValue);
    if (postsCurrentPage !== 1) {
      setPostsCurrentPage(1);
      setPostsForcePage(0);
      setIsLoadingPart(true);
    }
  }
  const handlePagingClick = (event) => {
    handlePagingPush(event.selected + 1);
    setPostsCurrentPage(event.selected + 1);
    setPostsForcePage(event.selected);
    setIsLoadingPart(true);
  }
  const handleLookupPush = (value) => {
    const queryObject = { lookup: value };
    const queryObjectString = GetUtils.GetStringfy('query', queryObject);
    routeHistory.push({
      search: queryObjectString,
    });
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

  // PostsAll
  useEffect(
    () => {
      isMounted.current = true;
      const storeKeyPrefix = 'Content' + routeUrlReplace + '_' + newLookupValue;
      const storeKey = storeKeyPrefix + '_' + postsCurrentPage + '_PostsAll';
      const storeKeyPaging = storeKeyPrefix + '_PostsAllPaging';
      const setResponse = (data, dataPaging) => {
        if (isMounted.current) {
          setPostsAll(data);
          setPostsAllTotal((data.length) ? dataPaging.total : 0);
          setIsLoadingSection(false);
          setIsLoadingPart(false);
        }
      }
      const getPostsAll = async () => {
        const Posts = ApiCPT(routeSlug)
          .embed()
          .order('desc')
          .orderby('date')
          .perPage(postsPerPage)
          .page(postsCurrentPage)
          .search(newLookupValue);
        await Posts
          .get()
          .then(response => {
            if (!response.length) {
              GetUtils.GetGoto('/notfound');
            } else {
              GetStorage.UseSessionStoreDouble(storeKey, storeKeyPaging, response, response._paging, setResponse);
            }
          })
          .catch(error => console.log(error));
      }
      GetStorage.CallSessionStoreDouble(storeKey, storeKeyPaging, setResponse, getPostsAll);
      return () => {
        isMounted.current = false;
      }
    },
    [routeUrlReplace, routeSlug, routeUrl, postsCurrentPage, newLookupValue, postsPerPage, postsForcePage]
  );

  return (
    <React.Fragment>
      <h3 className="mb-5">{GetMenu.MenuLabel(routeSlug)}</h3>
      <p className="mb-5 font-italic text-right text-warning">워드프레스 특정 커스텀포스트타입('{GetMenu.MenuLabel(routeSlug)}')의 포스트를 출력하는 페이지입니다.</p>
      <Section loading={isLoadingSection} sectionClass={'section'} srTitle={GetMenu.MenuLabel(routeSlug)}>
        {/* table */}
        {
          (props.type === 'table')
          &&
          <BoardTable.CTBoardTable>
            {
              (postsAllTotal > 0)
                ?
                (isLoadingPart)
                  ?
                  <Loading.CTLoadingTr colspan={3} />
                  :
                  postsAll
                    .map((item, index) => {
                      const getEmbedded = item._embedded;
                      const getTerm = 'wp:term' in getEmbedded;
                      return (
                        <BoardTable.CTBoardTableItem
                          key={index}
                          order={(postsAllTotal - ((postsCurrentPage - 1) * postsPerPage)) - index}
                          category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category', 'cpt').map(item => item.name).join(' / ') : ''}
                          link={routeUrl + '/_cpt_view/' + item.id + routeSearch}
                          title={GetUtils.GetEllipsis(item.title.rendered, 80, '')}
                          date={GetDate.FormatDate(item.date)}
                        />
                      )
                    })
                :
                <BoardTable.CTBoardTableItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </BoardTable.CTBoardTable>
        }
        {/* //table */}
        {/* card */}
        {
          (props.type === 'card')
          &&
          <BoardCard.CTBoardCard>
            {
              (postsAllTotal > 0)
                ?
                (isLoadingPart)
                  ?
                  <Loading.CTLoadingDiv />
                  :
                  postsAll
                    .map((item, index) => {
                      const getEmbedded = item._embedded;
                      const getTerm = 'wp:term' in getEmbedded;
                      return (
                        <BoardCard.CTBoardCardItem
                          key={index}
                          col={props.col}
                          image={GetUtils.GetEmbed(getEmbedded, 'image', 'cpt')}
                          category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category', 'cpt').map(item => item.name).join(' / ') : ''}
                          link={routeUrl + '/_cpt_view/' + item.id + routeSearch}
                          title={GetUtils.GetEllipsis(item.title.rendered, 10, '')}
                          excerpt={GetUtils.GetEllipsis(GetUtils.GetMarkupRemove(item.excerpt.rendered), 70, '')}
                          date={GetDate.FormatDate(item.date)}
                        />
                      )
                    })
                :
                <BoardCard.CTBoardCardItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </BoardCard.CTBoardCard>
        }
        {/* //card */}
        {
          (postsAllTotal > 0)
          &&
          <ReactPaginate
            pageCount={Math.ceil(postsAllTotal / postsPerPage)}
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
            forcePage={postsForcePage}
          />
        }
        <Form.CTForm
          onSubmit={handleLookupSubmit}
        >
          <InputGroup.CTInputGroupText
            groupClass={'mt-5 w-50 mx-auto'}
            controlLabel={'검색어'}
            controlType={'text'}
            placeholder={'검색어를 입력하세요.'}
            onChange={handleLookupChange}
            value={lookupValue}
            buttonClass={'btn-outline-secondary'}
            buttonType={'submit'}
            buttonLabel={'검색'}
          />
        </Form.CTForm>
      </Section>
    </React.Fragment>
  )

}