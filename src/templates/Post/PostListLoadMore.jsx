import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Api from 'settings/Api';
import Section from 'layouts/Section';
import * as BoardTable from 'components/BoardTable';
import * as BoardCard from 'components/BoardCard';
import * as Button from 'components/Button';
import * as Loading from 'components/Loading';
import * as GetRoute from 'utils/GetRoute';
import * as GetUtils from 'utils/GetUtils';
import * as GetStorage from 'utils/GetStorage';
import * as GetMenu from 'utils/GetMenu';
import * as GetDate from 'utils/GetDate';

export default function PostListLoadMore(props) {

  const isMounted = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px',
    delay: 100,
  });
  const postsPerPage = props.perPage;
  const routeSlug = GetRoute.RouteSlug();
  const routeUrl = GetRoute.RouteUrl();
  const routeUrlReplace = routeUrl.replace(/\//gi, '_');
  const routeHistory = GetRoute.RouteHistory();
  const routeSearch = GetRoute.RouteSearch();
  const searchQuery = GetUtils.GetParse('query', routeSearch);
  const searchQueryPaging = searchQuery.paging ? searchQuery.paging : 1;
  const [postsCurrentPage, setPostsCurrentPage] = useState(Number(searchQueryPaging));
  const [postsAll, setPostsAll] = useState([]);
  const [postsAllTotal, setPostsAllTotal] = useState([]);
  const [postsAllTotalPages, setPostsAllTotalPages] = useState([]);
  const [isLoadingSection, setIsLoadingSection] = useState(true);
  const [isLoadingPart, setIsLoadingPart] = useState(true);
  const concatStoreKeyPrefix = 'Content' + routeUrlReplace + '_';
  const isConcatStore = () => {
    const getStoreKeyConcat = concatStoreKeyPrefix + postsCurrentPage + '_PostsConcat';
    const concatStore = GetStorage.GetSessionStore(getStoreKeyConcat);
    if (Number(searchQueryPaging) > 1) {
      if (concatStore) {
        return concatStore;
      } else {
        GetUtils.GetGoto(routeUrl);
      }
    } else {
      return [];
    }
  }
  const [postsConcat, setPostsConcat] = useState(isConcatStore());
  const handlePagingClick = () => {
    const postsJoin = postsConcat.concat(postsAll);
    const setStoreKeyConcat = concatStoreKeyPrefix + (postsCurrentPage + 1) + '_PostsConcat';
    handlePagingPush(postsCurrentPage + 1);
    setPostsCurrentPage(postsCurrentPage + 1);
    setPostsConcat(postsJoin);
    setIsLoadingPart(true);
    GetStorage.SetSessionStore(setStoreKeyConcat, postsJoin);
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
  const callLoadMoreItem = useCallback(
    (postsArray, type) => {
      return (
        postsArray
          .map((item, index) => {
            const getEmbedded = item._embedded;
            const postsAllOrder = (postsAllTotal - ((postsCurrentPage - 1) * postsPerPage)) - index;
            const postsConcatOrder = postsAllTotal - index;
            const getOrder = (type === 'all') ? postsAllOrder : postsConcatOrder;
            const getTerm = 'wp:term' in getEmbedded;
            return (
              [
                (props.type === 'table')
                &&
                <BoardTable.CTBoardTableItem
                  key={index}
                  order={getOrder}
                  category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category').map(item => item.name).join(' / ') : ''}
                  link={routeUrl + '/_view/' + item.id + routeSearch}
                  title={GetUtils.GetEllipsis(item.title.rendered, 80, '')}
                  date={GetDate.FormatDate(item.date)}
                />
                ,
                (props.type === 'card')
                &&
                <BoardCard.CTBoardCardItem
                  key={index}
                  col={props.col}
                  image={GetUtils.GetEmbed(getEmbedded, 'image')}
                  category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category').map(item => item.name).join(' / ') : ''}
                  link={routeUrl + '/_view/' + item.id + routeSearch}
                  title={GetUtils.GetEllipsis(item.title.rendered, 10, '')}
                  excerpt={GetUtils.GetEllipsis(GetUtils.GetMarkupRemove(item.excerpt.rendered), 70, '')}
                  date={GetDate.FormatDate(item.date)}
                />
              ]
            )
          })
      )
    },
    [postsAllTotal, postsCurrentPage, postsPerPage, routeSearch, routeUrl, props.type, props.col],
  );

  // InView
  useEffect(
    () => {
      if (inView) {
        document.querySelector('#btnLoadMore').click();
      }
    },
    [inView]
  );

  // PostsAll
  useEffect(
    () => {
      isMounted.current = true;
      const storeKeyPrefix = 'Content' + routeUrlReplace;
      const storeKey = storeKeyPrefix + '_' + postsCurrentPage + '_PostsAll';
      const storeKeyPaging = storeKeyPrefix + '_PostsAllPaging';
      const setResponse = (data, dataPaging) => {
        if (isMounted.current) {
          setPostsAll(data);
          setPostsAllTotal((data.length) ? dataPaging.total : 0);
          setPostsAllTotalPages((data.length) ? dataPaging.totalPages : 0);
          setIsLoadingSection(false);
          setIsLoadingPart(false);
        }
      }
      const getPostsAll = async () => {
        const Posts = Api
          .posts()
          .embed()
          .order('desc')
          .orderby('date')
          .perPage(postsPerPage)
          .page(postsCurrentPage);
        await Posts
          .get()
          .then(response => {
            if (!response.length) {
              GetUtils.GetGoto('/notfound');
            } else {
              const extractResponse = response.map(item =>
              ({
                'id': item.id,
                'title': item.title,
                'date': item.date,
                'excerpt': item.excerpt,
                '_embedded': item._embedded,
              })
              );
              GetStorage.UseSessionStoreDouble(storeKey, storeKeyPaging, extractResponse, response._paging, setResponse);
            }
          })
          .catch(error => console.log(error));
      }
      GetStorage.CallSessionStoreDouble(storeKey, storeKeyPaging, setResponse, getPostsAll);
      return () => {
        isMounted.current = false;
      }
    },
    [routeUrlReplace, routeSlug, routeUrl, postsPerPage, postsCurrentPage]
  );

  return (
    <React.Fragment>
      <h3 className="mb-5">{GetMenu.MenuLabel(routeSlug)}</h3>
      <p className="mb-5 font-italic text-right text-warning">워드프레스 전체 포스트를 무한스크롤 방식으로 출력하는 페이지입니다.</p>
      <Section loading={isLoadingSection} sectionClass={'section'} srTitle={GetMenu.MenuLabel(routeSlug)}>
        {/* table */}
        {
          (props.type === 'table')
          &&
          <BoardTable.CTBoardTable tbodyClass={'listLoadMore'}>
            {
              (postsAllTotal > 0)
                ?
                <React.Fragment>
                  {
                    callLoadMoreItem(postsConcat, 'concat')
                  }
                  {
                    (isLoadingPart)
                      ?
                      <Loading.CTLoadingTr colspan={3} />
                      :
                      callLoadMoreItem(postsAll, 'all')
                  }
                </React.Fragment>
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
                <React.Fragment>
                  {
                    callLoadMoreItem(postsConcat, 'concat')
                  }
                  {
                    (isLoadingPart)
                      ?
                      <Loading.CTLoadingDiv />
                      :
                      callLoadMoreItem(postsAll, 'all')
                  }
                </React.Fragment>
                :
                <BoardCard.CTBoardCardItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </BoardCard.CTBoardCard>
        }
        {/* //card */}
        {
          (postsCurrentPage < postsAllTotalPages)
            ?
            ((searchQueryPaging * postsPerPage) < 100)
              ?
              <React.Fragment>
                <div id="targetLoadMore" ref={ref}></div>
                <Button.CTButtonBasic
                  wrapperClass={'text-center'}
                  buttonId={'btnLoadMore'}
                  buttonClass={'btn-outline-primary'}
                  onClick={handlePagingClick}
                  title={'더보기'}
                />
              </React.Fragment>
              :
              <p className="text-center py-5">최대 100개의 게시글만 로드됩니다.</p>
            :
            <p className="text-center py-5">더이상 게시글이 없습니다.</p>
        }
      </Section>
    </React.Fragment>
  )

}