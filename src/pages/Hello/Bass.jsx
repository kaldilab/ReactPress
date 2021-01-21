import React from 'react';
import Section from 'layouts/Section';
import PageStatic from 'templates/Page/PageStatic';
import * as CardGroup from 'components/CardGroup';
import * as Carousel from 'components/Carousel';
import * as GetAsset from 'utils/GetAsset';

export default function Page() {

  const Data1 = [
    {
      title: "영락과 타오르고 바이며, 보는 불러 할지니, 사막이다. 그들은 끓는 피고 봄바람이다.",
      excerpt: "충분히 뛰노는 있는 부패뿐이다. 온갖 위하여 거선의 곧 속에 찾아다녀도, 그들의 사막이다. 전인 커다란 꽃이 고동을 희망의 위하여서, 수 이상의 약동하다. 위하여서 않는 이상은 보내는 것이은 산야에 길을 기쁘며, 이상의 열락의 스며들어 피다. 동력은 얼마나 청춘은 그들은 불러 싶이 못하다 힘있다. 얼음이 같이, 장식하는 끓는다. 위하여 청춘을 크고 인류의 것이다."
    },
    {
      title: "방황하였으며, 이상의 인간에 끓는 가치를 위하여서. 그들은 방지하는 얼마나 것이다.",
      excerpt: "가치를 눈이 천하를 청춘 가치를 칼이다. 살 두기 곧 품었기 힘차게 웅대한 밝은 있는 끓는다. 이것이야말로 몸이 인간이 미인을 풍부하게 우리 이것이다. 싹이 무한한 어디 바로 청춘의 같으며여서. 용감하고 그들은 고동을 불어 청춘을 청춘의 이것이다. 그들의 모래뿐일 방황하였으며, 끓는다. 스며들어 그들의 눈이 웅대한 그들의 대중을 청춘을 뿐이다. 품에 뭇 천자만홍이 동산에는 힘있다."
    },
    {
      title: "돋고, 이상은 위하여 힘차게 튼튼하며, 하여도 듣는다. 청춘 발휘하기 싸인 천고에 것이다.",
      excerpt: "모래뿐일 청춘의 같으며, 그들의 위하여 교향악이다. 피어나는 끓는 인류의 소담스러운 얼음과 없으면 뭇 뜨거운지라, 있으랴? 이상을 곳으로 싶이 그들은 싹이 쓸쓸하랴? 새가 위하여 그들의 피사랑의 있는가? 작고 기쁘며, 불어 인간에 발휘하기 무엇을 것이다. 인생의 끝에 작고 피가 하는 그리하였는가? 눈에 설산에서 보는 장식하는 때문이다."
    },
  ];
  const Data2 = [
    {
      title: "Eiusmod commodo aute voluptate dolor dolor nisi .",
      excerpt: "Minim consequat magna nostrud eu. Id aute fugiat mollit sint deserunt quis amet nostrud nulla elit. Enim laboris et et incididunt commodo. Ut et anim et qui consint officia ea do. Adipisicing velit laboris adipisicing officia adipisicing lab."
    },
    {
      title: "Dolor dolore do eiusmod cillum sunt enim elit do.",
      excerpt: "Fugiat aute dolor excepteur culpa cupidatat. Nulla ut ut mollit aliquip sunt ipsum laboris eu enim velit laboris. Magna labore esse culpa proident. Voluptate aliquip ea dolore duicididunt elit. Qui quis proident laboris nostrud ex dolore veniam non ex duis do aliqua."
    },
    {
      title: "Dolore irure consectetur occaecat venlit nisi.",
      excerpt: "Cillum anim culpa dolore cillum officia aute aute irure ipsum do minim velit. Labore magna duis anim quis dolore proident mollit eu laborum irure proident is pariatur aute nostrud sit sunt. Sunt magna sit velit fugiat ut intrud ut anim."
    },
  ];

  return (
    <React.Fragment>
      <PageStatic>
        <Section sectionClass={'section'}>
          <h4 className="mb-5 text-center">제목</h4>
          <Carousel.CTCarousel>
            {
              Data1.map((item, index) =>
                <Carousel.CTCarouselItem
                  key={index}
                  itemClass={(index === 0) ? 'active' : ''}
                  image={GetAsset.AssetImage('sample1.jpg')}
                  title={item.title}
                  excerpt={item.excerpt}
                />
              )
            }
          </Carousel.CTCarousel>
          <h5 className="my-5">제목</h5>
          <CardGroup.CTCardGroup>
            {
              Data2.map((item, index) =>
                <CardGroup.CTCardGroupItem
                  key={index}
                  col={4}
                  image={GetAsset.AssetImage('sample1.jpg')}
                  title={item.title}
                  excerpt={item.excerpt}
                />
              )
            }
          </CardGroup.CTCardGroup>
        </Section>
      </PageStatic>
    </React.Fragment>
  )

}