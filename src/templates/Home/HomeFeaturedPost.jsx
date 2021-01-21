import React, { useState, useEffect, useRef } from 'react';
import Api from 'settings/Api';
import Section from 'layouts/Section';
import Swiper, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import * as Slider from 'components/Slider';
import * as CardDeck from 'components/CardDeck';
import * as ListDeck from 'components/ListDeck';
import * as GetUtils from 'utils/GetUtils';
import * as GetStorage from 'utils/GetStorage';
import * as GetMenu from 'utils/GetMenu';
import * as GetDate from 'utils/GetDate';

export default function HomeFeaturedPost(props) {

  const isMounted = useRef(false);
  const postsCategory = props.category;
  const postsPerPage = props.perPage;
  const componentType = props.type;
  const [featuredPost, setFeaturedPost] = useState([]);
  const [isLoadingSection, setIsLoadingSection] = useState(true);
  const featuredPostSlider = () => {
    Swiper.use([Navigation]);
    new Swiper('.featured-post-slider', {
      loop: true,
      speed: 1000,
      grabCursor: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // FeaturedPost
  useEffect(
    () => {
      isMounted.current = true;
      const storeKey = 'Home_' + postsCategory + '_' + componentType + '_' + postsPerPage + '_FeaturedPost';
      const setResponse = (data) => {
        if (isMounted.current) {
          setFeaturedPost(data);
          setIsLoadingSection(false);
        }
      }
      const getFeaturedPost = async () => {
        const categorySlug = (postsCategory) ? postsCategory : '';
        const Categories = Api
          .categories()
          .slug(categorySlug);
        await Categories
          .get()
          .then(response => {
            (componentType === 'slider') && featuredPostSlider();
            const categoryId = (postsCategory) ? response[0].id : '';
            const Posts = Api
              .posts()
              .categories(categoryId)
              .excludeCategories(1)
              .embed()
              .order('desc')
              .orderby('date')
              .perPage(postsPerPage);
            return Posts;
          })
          .then(response => {
            GetStorage.UseSessionStore(storeKey, response, setResponse);
          })
          .catch(error => console.log(error));
      }
      GetStorage.CallSessionStore(storeKey, setResponse, getFeaturedPost);
      return () => {
        isMounted.current = false;
      }
    },
    [postsCategory, postsPerPage, componentType]
  );

  return (
    <React.Fragment>
      <Section loading={isLoadingSection} sectionClass={props.sectionClass} srTitle={props.srTitle}>
        {props.children}
        {/* list */}
        {
          (componentType === 'list')
          &&
          <ListDeck.CTListDeck>
            {
              (featuredPost.length > 0)
                ?
                featuredPost
                  .map((item, index) => {
                    const getEmbedded = item._embedded;
                    const getLink = GetMenu.MenuUrl(GetUtils.GetEmbed(getEmbedded, 'category')[0].slug);
                    return (
                      <ListDeck.CTListDeckItem
                        key={index}
                        category={GetUtils.GetEmbed(getEmbedded, 'category').map(item => item.name).join(' / ')}
                        link={getLink + '/_view/' + item.id}
                        title={GetUtils.GetEllipsis(item.title.rendered, 20, '')}
                        excerpt={GetUtils.GetEllipsis(GetUtils.GetMarkupRemove(item.excerpt.rendered), 50, '')}
                        date={GetDate.FormatDate(item.date)}
                      />
                    )
                  })
                :
                <ListDeck.CTListDeckItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </ListDeck.CTListDeck>
        }
        {/* //list */}
        {/* card */}
        {
          (componentType === 'card')
          &&
          <CardDeck.CTCardDeck>
            {
              (featuredPost.length > 0)
                ?
                featuredPost
                  .map((item, index) => {
                    const getEmbedded = item._embedded;
                    const getLink = GetMenu.MenuUrl(GetUtils.GetEmbed(getEmbedded, 'category')[0].slug);
                    return (
                      <CardDeck.CTCardDeckItem
                        key={index}
                        col={props.col}
                        image={GetUtils.GetEmbed(getEmbedded, 'image')}
                        category={GetUtils.GetEmbed(getEmbedded, 'category').map(item => item.name).join(' / ')}
                        link={getLink + '/_view/' + item.id}
                        title={GetUtils.GetEllipsis(item.title.rendered, 20, '')}
                        excerpt={GetUtils.GetEllipsis(GetUtils.GetMarkupRemove(item.excerpt.rendered), 70, '')}
                        date={GetDate.FormatDate(item.date)}
                      />
                    )
                  })
                :
                <CardDeck.CTCardDeckItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </CardDeck.CTCardDeck>
        }
        {/* //card */}
        {/* slider */}
        {
          (componentType === 'slider')
          &&
          <Slider.CTSlider containerClass={'featured-post-slider'}>
            {
              (featuredPost.length > 0)
                ?
                featuredPost
                  .map((item, index) => {
                    const getEmbedded = item._embedded;
                    const getLink = GetMenu.MenuUrl(GetUtils.GetEmbed(getEmbedded, 'category')[0].slug);
                    return (
                      <Slider.CTSliderItem
                        key={index}
                        image={GetUtils.GetEmbed(getEmbedded, 'image')}
                        category={GetUtils.GetEmbed(getEmbedded, 'category').map(item => item.name).join(' / ')}
                        link={getLink + '/_view/' + item.id}
                        title={GetUtils.GetEllipsis(item.title.rendered, 20, '')}
                        excerpt={GetUtils.GetEllipsis(GetUtils.GetMarkupRemove(item.excerpt.rendered), 50, '')}
                      />
                    )
                  })
                :
                <Slider.CTSliderItemNone
                  text={'게시글이 없습니다.'}
                />
            }
          </Slider.CTSlider>
        }
        {/* //slider */}
      </Section>
    </React.Fragment>
  )

}