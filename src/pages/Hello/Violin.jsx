import React from 'react';
import Section from 'layouts/Section';
import PageStatic from 'templates/Page/PageStatic';
import * as Jumbotron from 'components/Jumbotron';
import * as Figure from 'components/Figure';
import * as GetAsset from 'utils/GetAsset';

export default function Page() {

  return (
    <React.Fragment>
      <PageStatic>
        <Section sectionClass={'section'}>
          <h4 className="mb-5 text-center">제목</h4>
          <Jumbotron.CTJumbotron
            title={'Demo Page'}
            lead={'이것은 데모 페이지입니다.'}
            excerpt={'얼음에 힘있다. 넣는 뛰노는 전인 구하기 장식하는 품었기 가는 쓸쓸하랴? 내는 청춘을 같으며, 이것은 오직 노년에게서 오아이스도 광야에서 착목한는 듣는다. 방황하여도, 있을 노래하며 않는 간에 그들의 피고 지혜는 같지 있는가? 뛰노는 피는 없는 것은 커다란 놀이 듣는다. 안고, 같이 못할 가슴이 보배를 그것은 방지하는 이상은 피어나는 아니다.'}
            link={'/'}
            buttonTitle={'Read More'}
          />
          <h5 className="my-5">제목</h5>
          <div className="mb-5">
            <p>크고 어디 실현에 무한한 것이다. 속에 인류의 천지는 전인 것이다. 영락과 방지하는 우리 가슴이 황금시대다. 인생을 밥을 싹이 봄바람이다. 살 구하지 관현악이며, 날카로우나 피부가 바이며, 풍부하게 무한한 것이다. 피에 가슴에 꾸며 속잎나고, 아니더면, 보라. 두기 그들의 되려니와, 어디 아니한 청춘을 트고, 열매를 대중을 것이다. 아니더면, 별과 바로 뼈 갑 투명하되 뿐이다. 같이 미묘한 날카로우나 불어 있는 봄바람이다.</p>
            <p>사는가 영락과 안고, 가슴에 별과 같지 눈에 뿐이다. 이성은 살았으며, 무엇을 귀는 우리의 것이다.보라, 주며, 얼음에 힘있다. 넣는 뛰노는 전인 구하기 장식하는 품었기 가는 쓸쓸하랴? 내는 청춘을 같으며, 이것은 오직 노년에게서 오아이스도 광야에서 착목한는 듣는다. 방황하여도, 있을 노래하며 않는 간에 그들의 피고 지혜는 같지 있는가? 뛰노는 피는 없는 것은 커다란 놀이 듣는다. 안고, 같이, 피는 그들의 트고, 대중을 따뜻한 말이다. 못할 가슴이 보배를 그것은 방지하는 이상은 피어나는 아니다. 위하여서 든 품으며, 싹이 있으며, 품었기 곳으로 사막이다.</p>
            <p>같지 힘차게 피에 살 것은 풀이 산야에 봄바람이다. 아름답고 일월과 주는 황금시대다. 것이 못할 열락의 우리는 이 같이 생명을 끓는다. 것은 사랑의 하였으며, 풍부하게 때에, 있는 평화스러운 이것이다. 이상이 위하여, 이것이야말로 창공에 불어 보라. 튼튼하며, 수 피고 돋고, 대한 군영과 그와 그들에게 때문이다. 가슴에 따뜻한 인생의 아니한 이상은 밥을 힘있다. 속에 영락과 인도하겠다는 예수는 하는 듣는다. 청춘의 주며, 불어 이성은 얼마나 인생에 이것이다. 그것을 봄바람을 그들의 전인 든 피가 것이다. 피가 못할 위하여, 그들의 그들의 아니다.</p>
          </div>
          <Figure.CTFigure
            image={GetAsset.AssetImage('sample1.jpg')}
            alt={'이미지'}
            caption={'A caption for the above image.'}
          />
          <h5 className="my-5">제목</h5>
          <dl className="row">
            <dt className="col-sm-3">Description lists</dt>
            <dd className="col-sm-9">A description list is perfect for defining terms.</dd>
            <dt className="col-sm-3">Euismod</dt>
            <dd className="col-sm-9">
              <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
              <p>Donec id elit non mi porta gravida at eget metus.</p>
            </dd>
            <dt className="col-sm-3">Malesuada porta</dt>
            <dd className="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>
            <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
            <dd className="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
            <dt className="col-sm-3">Nesting</dt>
            <dd className="col-sm-9">
              <dl className="row">
                <dt className="col-sm-4">Nested definition list</dt>
                <dd className="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
              </dl>
            </dd>
          </dl>
        </Section>
      </PageStatic>
    </React.Fragment>
  )

}