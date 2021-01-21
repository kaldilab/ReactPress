import React, { useState, useEffect, useRef } from 'react';
import Api, { ApiAuth } from 'settings/Api';
import Section from 'layouts/Section';
import * as Form from 'components/Form';
import * as GetUtils from 'utils/GetUtils';
import * as GetRoute from 'utils/GetRoute';
import * as GetStorage from 'utils/GetStorage';
import * as GetMenu from 'utils/GetMenu';

export default function PostEdit(props) {

  const isMounted = useRef(false);
  const routeOrigin = GetRoute.RouteOrigin();
  const routeSlug = GetRoute.RouteSlug('last', 2);
  const routeUrlReplace = GetRoute.RouteUrl().replace(/\//gi, '_');
  const gotoView = GetRoute.RouteUrl().replace('_edit', '_view');
  const routeParams = GetRoute.RouteParams('postId');
  const PostId = !isNaN(routeParams) ? routeParams : false;
  const [postTitle, setPostTitle] = useState([]);
  const [postContent, setPostContent] = useState([]);
  const [isLoadingSection, setIsLoadingSection] = useState(true);
  const handleTitleChange = (event) => {
    const { value } = event.target;
    setPostTitle(value);
  }
  const handleContentChange = (event) => {
    const { value } = event.target;
    setPostContent(value);
  }
  const createPosts = async (event) => {
    event.preventDefault();
    const Posts = ApiAuth().posts().id(PostId);
    await Posts
      .update({
        title: postTitle,
        content: postContent,
        status: 'publish',
      })
      .then(response => {
        if (response) {
          alert('글이 수정되었습니다.');
          GetUtils.GetGoto(gotoView);
        } else {
          GetUtils.GetGoto('/notfound');
        }
      })
      .catch(error => console.log(error));
  };

  // Posts
  useEffect(
    () => {
      isMounted.current = true;
      const storeKey = 'Content' + routeUrlReplace + '_Posts';
      const setResponse = (data) => {
        const getTitle = data.title.rendered;
        const getContent = data.content.rendered;
        if (isMounted.current) {
          setPostTitle(getTitle);
          setPostContent(getContent);
          setIsLoadingSection(false);
        }
      }
      const getPosts = async () => {
        const Posts = Api.posts().id(PostId);
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
      <h3 className="mb-5">
        {GetMenu.MenuLabel(routeOrigin)} <small>{GetMenu.MenuLabel(routeSlug)}</small> - 수정
      </h3>
      <Section loading={isLoadingSection} sectionClass={'section'} srTitle={GetMenu.MenuLabel(routeSlug)}>
        <Form.CTForm
          formClass={'w-75 mx-auto pt-3'}
          onSubmit={createPosts}
        >
          <Form.CTFormText
            id={'formTitle'}
            label={'제목'}
            name={'formTitle'}
            type={'text'}
            placeholder={'제목을 입력하세요.'}
            onChange={handleTitleChange}
            value={postTitle}
          />
          <Form.CTFormTextarea
            id={'formContent'}
            label={'내용'}
            name={'formContent'}
            rows={'5'}
            placeholder={'내용을 입력하세요.'}
            onChange={handleContentChange}
            value={postContent}
          />
          <Form.CTFormButton
            buttonClass={'btn-primary'}
            type={'submit'}
            value={'수정완료'}
          />
        </Form.CTForm>
      </Section>
    </React.Fragment>
  )

}