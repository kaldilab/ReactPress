import React, { useState, useEffect, useRef } from 'react';
import Api from 'settings/Api';
import Section from 'layouts/Section';
import * as BoardView from 'components/BoardView';
import * as Button from 'components/Button';
import PostDelete from "templates/Post/PostDelete";
import * as GetRoute from 'utils/GetRoute';
import * as GetUtils from 'utils/GetUtils';
import * as GetMenu from 'utils/GetMenu';
import * as GetStorage from 'utils/GetStorage';
import * as GetAsset from 'utils/GetAsset';
import * as GetDate from 'utils/GetDate';
import * as GetAuth from 'utils/GetAuth';

export default function PostView(props) {

  const isMounted = useRef(false);
  const isAuthorized = GetAuth.GetStoreAuthValid();
  const routeSlug = GetRoute.RouteSlug('last', 3);
  const routeUrl = GetRoute.RouteUrl();
  const routeUrlReplace = routeUrl.replace(/\//gi, '_');
  const routeParams = GetRoute.RouteParams('postId');
  const PostId = !isNaN(routeParams) ? routeParams : false;
  const routeSearch = GetRoute.RouteSearch();
  const gotoBack = routeUrl.replace('/_view/' + PostId, '') + routeSearch;
  const gotoEdit = routeUrl.replace('_view', '_edit');
  const [postTitle, setPostTitle] = useState([]);
  const [postContent, setPostContent] = useState([]);
  const [postCategory, setPostCategory] = useState([]);
  const [postTag, setPostTag] = useState([]);
  const [postFeaturedImage, setPostFeaturedImage] = useState([]);
  const [postDate, setPostDate] = useState(new Date());
  const [postAuthor, setPostAuthor] = useState([]);
  const [isLoadingSection, setIsLoadingSection] = useState(true);

  // Posts
  useEffect(
    () => {
      isMounted.current = true;
      const storeKey = 'Content' + routeUrlReplace + '_Posts';
      const setResponse = (data) => {
        const getTitle = data.title.rendered;
        const getContent = data.content.rendered;
        const getEmbedded = data._embedded;
        const getFeaturedMedia = 'wp:featuredmedia' in getEmbedded;
        const getFeaturedImage = (getFeaturedMedia) ? getEmbedded['wp:featuredmedia'][0].source_url : GetAsset.AssetImage('default.jpg');
        const getDate = data.date;
        if (isMounted.current) {
          setPostTitle(getTitle);
          setPostContent(GetUtils.GetMarkup(getContent));
          setPostCategory(GetUtils.GetEmbed(getEmbedded, 'category'));
          setPostTag(GetUtils.GetEmbed(getEmbedded, 'tag'));
          setPostFeaturedImage(getFeaturedImage);
          setPostDate(GetDate.FormatDateTime(getDate));
          setPostAuthor(GetUtils.GetEmbed(getEmbedded, 'author'));
          setIsLoadingSection(false);
        }
      }
      const getPosts = async () => {
        const Posts = Api
          .posts()
          .id(PostId)
          .embed();
        await Posts
          .get()
          .then(response => {
            if (!response) {
              GetUtils.GetGoto('/notfound');
            } else {
              GetStorage.UseSessionStore(storeKey, response, setResponse);
            }
          })
          .catch(error => {
            console.log(error);
            (error.data.status === 404) && GetUtils.GetGoto('/notfound');
          });
      }
      GetStorage.CallSessionStorePost(storeKey, setResponse, getPosts, PostId);
      return () => {
        isMounted.current = false;
      }
    },
    [PostId, routeUrlReplace]
  );

  return (
    <React.Fragment>
      <h3 className="mb-5">{GetMenu.MenuLabel(routeSlug)}</h3>
      <Section loading={isLoadingSection} sectionClass={'section'}>
        <BoardView.CTBoardView>
          <BoardView.CTBoardViewHead
            title={postTitle}
            category={(postCategory) ? postCategory.map(item => item.name).join(' / ') : ''}
            date={postDate}
            author={postAuthor}
            tag={(postTag) ? postTag.map((item, index) => { return <span key={index}>{item.name}</span> }) : ''}
          />
          <BoardView.CTBoardViewVisual
            url={postFeaturedImage}
            alt={postTitle}
          />
          <BoardView.CTBoardViewBody
            content={postContent}
          />
          <BoardView.CTBoardViewFoot
            link={gotoBack}
            button={'목록으로'}
          />
        </BoardView.CTBoardView>
      </Section>
      {
        (isAuthorized)
        &&
        <div className="clearfix text-right">
          <Button.CTButton
            type={'anchor'}
            buttonClass={'btn-outline-primary mr-1'}
            link={gotoEdit}
            title={'수정'}
          />
          <PostDelete />
        </div>
      }
    </React.Fragment>
  )

}