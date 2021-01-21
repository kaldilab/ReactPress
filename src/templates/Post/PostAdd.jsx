import React, { useState, useEffect, useRef } from 'react';
import Api, { ApiAuth } from 'settings/Api';
import Section from 'layouts/Section';
import * as Form from 'components/Form';
import * as GetUtils from 'utils/GetUtils';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';

export default function PostAdd(props) {

  const isMounted = useRef(false);
  const routeOrigin = GetRoute.RouteOrigin();
  const routeSlug = GetRoute.RouteSlug('last', 2);
  const gotoView = GetRoute.RouteUrl().replace('_add', '_view/');
  const [postTitle, setPostTitle] = useState([]);
  const [postContent, setPostContent] = useState([]);
  const [postCategoryId, setPostCategoryId] = useState('');
  const [postsCategories, setPostsCategories] = useState([]);
  const [isCategory, setIsCategory] = useState(true);
  const handleTitleChange = (event) => {
    const { value } = event.target;
    setPostTitle(value);
  }
  const handleContentChange = (event) => {
    const { value } = event.target;
    setPostContent(value);
  }
  const handleCategoryIdChange = (event) => {
    const { value } = event.target;
    setPostCategoryId(value);
  }
  const createPosts = async (event) => {
    event.preventDefault();
    const Posts = ApiAuth().posts();
    await Posts
      .create({
        title: postTitle,
        content: postContent,
        categories: [postCategoryId],
        status: 'publish',
      })
      .then(response => {
        if (response) {
          alert('글이 등록되었습니다.');
          GetUtils.GetGoto(gotoView + response.id);
        } else {
          GetUtils.GetGoto('/notfound');
        }
      })
      .catch(error => console.log(error));
  };

  // PostsCategories
  useEffect(
    () => {
      isMounted.current = true;
      const getPostsCategories = async () => {
        const Categories = Api
          .categories()
          .order('asc')
          .orderby('id');
        await Categories
          .get()
          .then(response => {
            if (!response.length) {
              GetUtils.GetGoto('/notfound');
            } else {
              response.splice(0, 1);
              const postCategory = response.find(item => item.slug === routeSlug);
              setIsCategory((postCategory) ? true : false);
              setPostCategoryId((postCategory) ? postCategory.id : 2);
              setPostsCategories(response);
            }
          })
          .catch(error => console.log(error));
      }
      getPostsCategories();
      return () => {
        isMounted.current = false;
      }
    },
    [routeSlug]
  );

  return (
    <React.Fragment>
      <h3 className="mb-5">
        {GetMenu.MenuLabel(routeOrigin)} <small>{GetMenu.MenuLabel(routeSlug)}</small> - 쓰기
      </h3>
      <Section sectionClass={'section'} srTitle={GetMenu.MenuLabel(routeSlug)}>
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
          {
            (!isCategory)
            &&
            <Form.CTFormSelect
              id={'formCategory'}
              label={'카테고리'}
              name={'formCategory'}
              onChange={handleCategoryIdChange}
              value={postCategoryId}
            >
              <option>카테고리를 선택하세요</option>
              {
                postsCategories
                  .map((item, index) => {
                    return (
                      <option key={index} value={item.id}>{item.name}</option>
                    )
                  })
              }
            </Form.CTFormSelect>
          }
          <Form.CTFormButton
            buttonClass={'btn-primary'}
            type={'submit'}
            value={'작성완료'}
          />
        </Form.CTForm>
      </Section>
    </React.Fragment>
  )

}