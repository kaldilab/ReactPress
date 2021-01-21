import React, { useState, useEffect, useRef } from 'react';
import { ApiCPT } from 'settings/Api';
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

export default function HomeFeaturedCPT(props) {

  const isMounted = useRef(false);
  const postsCPT = props.cpt;
  const postsPerPage = props.perPage;
  const componentType = props.type;
  const [featuredCPT, setFeaturedCPT] = useState([]);
  const [isLoadingSection, setIsLoadingSection] = useState(true);
  const featuredCPTSlider = () => {
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

  // FeaturedCPT
  useEffect(
    () => {
      isMounted.current = true;
      const storeKey = 'Home_' + postsCPT + '_' + componentType + '_' + postsPerPage + '_FeaturedCPT';
      const setResponse = (data) => {
        if (isMounted.current) {
          setFeaturedCPT(data);
          setIsLoadingSection(false);
        }
      }
      const getFeaturedCPT = async () => {
        const Categories = ApiCPT(postsCPT)
        .embed()
        .order('desc')
        .orderby('date')
        .perPage(postsPerPage);
        await Categories
          .get()
          .then(response => {
            (componentType === 'slider') && featuredCPTSlider();
            GetStorage.UseSessionStore(storeKey, response, setResponse);
          })
          .catch(error => console.log(error));
      }
      GetStorage.CallSessionStore(storeKey, setResponse, getFeaturedCPT);
      return () => {
        isMounted.current = false;
      }
    },
    [postsCPT, postsPerPage, componentType]
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
              (featuredCPT.length > 0)
                ?
                featuredCPT
                  .map((item, index) => {
                    const getEmbedded = item._embedded;
                    const getTerm = 'wp:term' in getEmbedded;
                    const getLink = GetMenu.MenuUrl(postsCPT);
                    return (
                      <ListDeck.CTListDeckItem
                        key={index}
                        category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category', 'cpt').map(item => item.name).join(' / ') : ''}
                        link={getLink + '/_cpt_view/' + item.id}
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
              (featuredCPT.length > 0)
                ?
                featuredCPT
                  .map((item, index) => {
                    const getEmbedded = item._embedded;
                    const getTerm = 'wp:term' in getEmbedded;
                    const getLink = GetMenu.MenuUrl(postsCPT);
                    return (
                      <CardDeck.CTCardDeckItem
                        key={index}
                        col={props.col}
                        image={GetUtils.GetEmbed(getEmbedded, 'image', 'cpt')}
                        category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category', 'cpt').map(item => item.name).join(' / ') : ''}
                        link={getLink + '/_cpt_view/' + item.id}
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
              (featuredCPT.length > 0)
                ?
                featuredCPT
                  .map((item, index) => {
                    const getEmbedded = item._embedded;
                    const getTerm = 'wp:term' in getEmbedded;
                    const getLink = GetMenu.MenuUrl(postsCPT);
                    return (
                      <Slider.CTSliderItem
                        key={index}
                        image={GetUtils.GetEmbed(getEmbedded, 'image', 'cpt')}
                        category={(getTerm) ? GetUtils.GetEmbed(getEmbedded, 'category', 'cpt').map(item => item.name).join(' / ') : ''}
                        link={getLink + '/_cpt_view/' + item.id}
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