import React, { useState, useEffect, useRef } from 'react';
import Api from 'settings/Api';
import Section from 'layouts/Section';
import * as Figure from 'components/Figure';
import * as GetRoute from 'utils/GetRoute';
import * as GetUtils from 'utils/GetUtils';
import * as GetStorage from 'utils/GetStorage';
import * as GetMenu from 'utils/GetMenu';

export default function PageDynamic(props) {

  const isMounted = useRef(false);
  const routeSlug = GetRoute.RouteSlug();
  const routeUrlReplace = GetRoute.RouteUrl().replace(/\//gi, '_');
  const [pageTitle, setPageTitle] = useState([]);
  const [pageContent, setPageContent] = useState([]);
  const [pageFeaturedImage, setPageFeaturedImage] = useState([]);
  const [isLoadingSection, setIsLoadingSection] = useState(true);

  // Pages
  useEffect(
    () => {
      isMounted.current = true;
      const storeKey = 'Content' + routeUrlReplace + '_Pages';
      const setResponse = (data) => {
        const getTitle = data[0].title.rendered;
        const getContent = data[0].content.rendered;
        const getEmbedded = data[0]._embedded;
        if (isMounted.current) {
          setPageTitle(getTitle);
          setPageContent(GetUtils.GetMarkup(getContent));
          setPageFeaturedImage(GetUtils.GetEmbed(getEmbedded, 'image'));
          setIsLoadingSection(false);
        }
      }
      const getPages = async () => {
        const Pages = Api
          .pages()
          .slug(routeSlug)
          .embed();
        await Pages
          .get()
          .then(response => {
            if (!response.length) {
              GetUtils.GetGoto('/notfound');
            } else {
              GetStorage.UseSessionStore(storeKey, response, setResponse);
            }
          })
          .catch(error => console.log(error));
      }
      GetStorage.CallSessionStore(storeKey, setResponse, getPages);
      return () => {
        isMounted.current = false;
      }
    },
    [routeUrlReplace, routeSlug]
  );

  return (
    <React.Fragment>
      <h3 className="mb-3">{GetMenu.MenuLabel(routeSlug)}</h3>
      <p className="mb-5 font-italic text-right text-warning">워드프레스 특정 페이지('{GetMenu.MenuLabel(routeSlug)}')를 출력하는 동적인 고정페이지입니다.</p>
      <Section loading={isLoadingSection} sectionClass={'section'}>
        <h4 className="mb-5 text-center">{pageTitle}</h4>
        {
          (pageFeaturedImage)
          &&
          <Figure.CTFigure
            figureClass={'mb-5 text-center'}
            imageClass={'border w-75'}
            image={pageFeaturedImage}
            alt={pageTitle}
            caption={'워드프레스 에디터에서 등록한 특성 이미지가 노출됩니다. 등록하지 않으면 기본 이미지가 노출됩니다.'}
          />
        }
        <div dangerouslySetInnerHTML={pageContent}></div>
      </Section>
    </React.Fragment>
  )

}