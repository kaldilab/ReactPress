import React from 'react';
import Section from 'layouts/Section';
import PageStatic from 'templates/Page/PageStatic';
import * as MediaGroup from 'components/MediaGroup';
import * as ListGroup from 'components/ListGroup';
import * as Button from 'components/Button';
import * as Figure from 'components/Figure';
import * as GetAsset from 'utils/GetAsset';

export default function Page() {

  const Data1 = [
    {
      title: "그들에게 지혜는 할지니, 봄날의 피다. 장식하는 이상 석가는 인류의 황금시대의 것이다.",
      excerpt: "사랑의 두기 속에 때까지 않는 인간에 사막이다. 인간은 어디 봄바람을 평화스러운 바이며, 노년에게서 아름답고 그것은 몸이 사막이다. 소리다.이것은 눈에 같은 만천하의 끓는 자신과 곧 위하여서. 얼마나 아니한 없으면, 방지하는 풍부하게 바로 자신과 것이다. 청춘 이 용기가 끓는다. 얼마나 아니한 청춘 발휘하기 자신과 것이다. 수 대고, 가치를 위하여서 인도하겠다는 인간은 봄바람을 창공에 끓는다. 품었기 이 피가 트고, 가슴이 부패를 사막이다. 않는 기쁘며, 하였으며, 있는 봄바람이다. 간에 부패를 위하여 현저하게 황금시대를 있는 소금이라 사는가 황금시대다."
    },
    {
      title: "얼음과 모래뿐일 천자만홍이 피어나기 대고, 끓는 속에서 가진 아름다우냐? 두손을 우는 가는 약동하다.",
      excerpt: "더운지라 이 뭇 동력은 같지 약동하다. 석가는 더운지라 있을 힘있다. 행복스럽고 목숨을 풀밭에 쓸쓸하랴? 불어 구하기 남는 그들은 석가는 있으랴? 피부가 부패를 공자는 꾸며 것이다. 두기 위하여서 행복스럽고 천고에 가슴에 품으며, 과실이 소금이라 천지는 칼이다. 못하다 품으며, 인간의 어디 얼마나 소금이라 지혜는 있는가? 광야에서 꽃이 이것은 석가는 가는 사막이다. 피어나기 꾸며 인생에 이상의 현저하게 트고, 그들의 얼음에 미묘한 있는가? 이상의 용기가 청춘 영원히 가지에 천자만홍이 찬미를 쓸쓸하랴?"
    },
    {
      title: "가치를 천지는 품었기 말이다. 군영과 무엇을 몸이 피고 구할 품에 할지라도 피에 사막이다.",
      excerpt: "주는 풍부하게 심장의 이상 있는 실로 뜨거운지라, 이것이다. 청춘의 이상 소리다.이것은 아니한 두기 별과 낙원을 물방아 따뜻한 그리하였는가? 용기가 있는 자신과 피고 아니다. 같이 가진 무엇을 돋고, 것이다. 있는 위하여서, 눈이 것이다. 원대하고, 아니한 실로 예가 실현에 가치를 듣기만 있는가? 이상 위하여서 풍부하게 그들은 보내는 때문이다. 사라지지 것은 방황하였으며, 바이며, 무엇을 하여도 청춘 부패를 위하여서 아니다. 그들의 우리의 가치를 가진 있을 산야에 청춘 것이다. 이상은 영원히 찾아다녀도, 아니다. 속잎나고, 그것은 장식하는 있으며, 얼음과 위하."
    },
  ];
  const Data2 = [
    {
      title: "Est minim aute pariatur sunt ad commodo anim deserunt consectetur est.",
      excerpt: "Commodo irure laborum non qui amet. Cillum irure voluptate et amet exercitation. Et velit ullamco ex velit adipisicing officia magna enim veniam consequat labore est ea duis. Amet occaecat nisi elit cupidatat est dolor proident do ullamco veniam reprehenderit nisi labore nostrud."
    },
    {
      title: "Qui dolor ex do id id labore.",
      excerpt: "Velit incididunt ut dolor occaecat eiusmod aute sit consectetur occaecat ullamco. Aute voluptate qui consectetur non esse laboris duis officia Lorem sit minim. Cupidatat exercitation excepteur proident laboris ullamco veniam veniam in velit exercitation. Mollit ad voluptate est culpa dolore labore esse sint aliquip irure magna enim laboris. Ipsum cupidatat cupidatat cillum excepteur adipisicing nisi laboris ullamco ex in."
    },
    {
      title: "Est amet culpa ea cupidatat adipisicing non mollit consequat proident anim culpa.",
      excerpt: "Laboris sint pariatur do et quis consectetur. Dolor ullamco dolore magna duis reprehenderit sint esse adipisicing cupidatat non consequat pariatur non excepteur. Laborum tempor anim dolore et eu. Esse aliquip Lorem nisi consequat enim. Veniam tempor veniam veniam elit veniam in irure. Aliquip aliquip ut ut dolore excepteur ipsum esse ex et quis labore. Do aliqua enim ex pariatur adipisicing laborum pariatur aliquip pariatur ex."
    },
  ];

  return (
    <React.Fragment>
      <PageStatic>
        <Section sectionClass={'section'}>
          <h4 className="mb-5 text-center">제목</h4>
          <MediaGroup.CTMediaGroup groupClass={'mb-5'}>
            {
              Data1.map((item, index) =>
                <MediaGroup.CTMediaGroupItem
                  key={index}
                  image={GetAsset.AssetImage('sample1.jpg')}
                  title={item.title}
                  excerpt={item.excerpt}
                />
              )
            }
          </MediaGroup.CTMediaGroup>
          <h5 className="my-5">제목</h5>
          <div className="row">
            <div className="col-md-6">
              <Figure.CTFigure
                image={GetAsset.AssetImage('sample1.jpg')}
                alt={'이미지'}
                caption={'A caption for the above image.'}
              />
            </div>
            <div className="col-md-6">
              <Figure.CTFigure
                image={GetAsset.AssetImage('sample1.jpg')}
                alt={'이미지'}
                caption={'A caption for the above image.'}
              />
            </div>
          </div>
          <h5 className="my-5">제목</h5>
          <ListGroup.CTListGroup>
            {
              Data2.map((item, index) =>
                <ListGroup.CTListGroupItem
                  key={index}
                  title={item.title}
                  excerpt={item.excerpt}
                >
                  <Button.CTButton
                    type={'basic'}
                    buttonClass={'btn-primary mt-3'}
                    title={'Go'}
                  />
                </ListGroup.CTListGroupItem>
              )
            }
          </ListGroup.CTListGroup>
        </Section>
      </PageStatic>
    </React.Fragment>
  )

}