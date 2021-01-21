# ReactPress

<p>일반적으로 React로 애플리케이션을 제작할 때, React로 클라이언트 사이드를 구현하고, Express(Node.js) 등으로 서버 사이드를 구축하여 그 둘을 연동하곤 한다. 그런데 서버 사이드를 구축할 때, DB의 테이블을 설계하고 필드를 구성하는 작업까지 일일이 처리하기에는 빠르게 애플리케이션을 제작하는 데 있어서 상대적으로 효율이 떨어질 수 있다. 웹사이트 제작을 의뢰한 고객에게 기본적인 관리자 대시보드까지 제공해야 한다면, 관리의 효율성과 편의성까지 감안한 관리자 화면을 만들기 위한 시간도 더 필요하다.</p>
<p>이런 어려움을 극복하기 위한 대안으로 여러 해결책이 있겠지만, 일명 헤드리스 시스템을 활용해보았다. <strong>Headless CMS</strong>는 생성, 저장 등의 기능만 활용하고 사용자에게 전달될 컨텐츠는 API로 제공하는 시스템을 말하는데, React와 Wordpress의 조합이 그것에 적합할 수 있다. <strong>React</strong>는 사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리이고, <strong>Wordpress</strong>는 PHP 기반의 오픈소스 CMS이다. Wordpress가 기본적으로 제공하는 관리도구로 컨텐츠를 관리하고 React는 Wordpress가 제공하는 REST API로 컨텐츠를 가져와 사용자에게 전달하는 방식이다.</p>
<p><a href="https://frontity.org/" target="_blank"><b>Frontity</b></a>와 같은 워드프레스용 헤드리스 프레임워크가 있지만 서버 사이드 CMS를 Wordpress에만 국한할 것은 아니기 때문에, 다른 CMS와의 연동 가능성도 감안하여 Wordpress의 REST API만 부분적으로 연동하여 웹사이트 플랫폼 베이스를 구현해보았다. Demo 사이트를 참고하고 Github에서 파일을 다운 받아 활용해보자.</p>

## Feature

- 'create-react-app' 애플리케이션을 활용함.
- Wordpress의 'wpapi' 패키지를 활용하여 REST API를 연동함.
- SEO를 위해 'react-snap' 패키지를 활용하여 pre-rendered 방식으로 앱을 빌드함.
- 함수형 컴포넌트(Functional Component)를 사용함.
- Unspalsh라는 무료 이미지 API를 추가로 연동함.
- Json Web Token(JWT Auth) 인증 방식으로 로그인을 구현함.
- 워드프레스를 설치한 서버(:server_root/wp)에 앱 빌드 파일을 함께 배포(:server_root/app)함.

## Kaldi Lab

[Kaldi Lab](http://kaldilab.com/)의 ReactPress Website의 설명을 참고하세요.

- [ReactPress](http://kaldilab.com/wp/reactpress/)