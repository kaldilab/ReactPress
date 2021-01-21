import Home from 'pages/Home';
import Hello from 'pages/Hello';
import Violin from 'pages/Hello/Violin';
import Cello from 'pages/Hello/Cello';
import Bass from 'pages/Hello/Bass';
import About from 'pages/About';
import Summer from 'pages/About/Summer';
import Winter from 'pages/About/Winter';
import Fall from 'pages/About/Fall';
import Community from 'pages/Community';
import People from 'pages/Community/People';
import Spirit from 'pages/Community/Spirit';
import Nature from 'pages/Community/Nature';
import Square from 'pages/Square';
import Photo from 'pages/Square/Photo';
import Center from 'pages/Square/Center';
import Product from 'pages/Square/Product';
import Story from 'pages/Story';
import Love from 'pages/Story/Love';
import Food from 'pages/Story/Food';
import Money from 'pages/Story/Money';
import Member from 'pages/Member';
import Login from 'pages/Member/Login';
import User from 'pages/Member/User';
import Logout from 'pages/Member/Logout';
import Finder from 'pages/Finder';
import View from 'pages/View';
import Edit from 'pages/Edit';
import Add from 'pages/Add';
import NotFound from 'pages/NotFound';
import * as GetAuth from 'utils/GetAuth';

const isAuthorized = GetAuth.GetStoreAuthValid();
const FalseToTrue = (isAuthorized) ? true : false;
const TrueToFalse = (isAuthorized) ? false : true;

const Menus = [
  {
    path: [
      "/",
      "/home",
    ],
    slug: "home",
    label: "홈",
    navigation: false,
    authorization: false,
    component: Home,
  },
  {
    path: [
      "/*/_add",
    ],
    slug: "_add",
    label: "쓰기",
    navigation: false,
    authorization: TrueToFalse,
    component: Add,
  },
  {
    path: [
      "/*/_edit/:postId",
    ],
    slug: "_edit",
    label: "수정",
    navigation: false,
    authorization: TrueToFalse,
    component: Edit,
  },
  {
    path: [
      "/*/_view/:postId",
    ],
    slug: "_view",
    label: "보기",
    navigation: false,
    authorization: false,
    component: View,
  },
  {
    path: [
      "/*/_cpt_view/:postId",
    ],
    slug: "_cpt_view",
    label: "보기",
    navigation: false,
    authorization: false,
    component: View,
  },
  {
    path: [
      "/hello",
      "/hello/:helloChild1",
    ],
    slug: "hello",
    label: "헬로우",
    navigation: true,
    authorization: false,
    component: Hello,
    submenu: [
      {
        slug: "violin",
        label: "바이올린",
        navigation: true,
        authorization: false,
        component: Violin,
      },
      {
        slug: "cello",
        label: "첼로",
        navigation: true,
        authorization: false,
        component: Cello,
      },
      {
        slug: "bass",
        label: "베이스",
        navigation: true,
        authorization: false,
        component: Bass,
      },
    ]
  },
  {
    path: [
      "/about",
      "/about/:aboutChild1",
    ],
    slug: "about",
    label: "소개",
    navigation: true,
    authorization: false,
    component: About,
    submenu: [
      {
        slug: "summer",
        label: "여름",
        navigation: true,
        authorization: false,
        component: Summer,
      },
      {
        slug: "winter",
        label: "겨울",
        navigation: true,
        authorization: false,
        component: Winter,
      },
      {
        slug: "fall",
        label: "가을",
        navigation: true,
        authorization: false,
        component: Fall,
      },
    ]
  },
  {
    path: [
      "/community",
      "/community/:communityChild1",
    ],
    slug: "community",
    label: "커뮤니티",
    navigation: true,
    authorization: false,
    component: Community,
    submenu: [
      {
        slug: "people",
        label: "사람",
        navigation: true,
        authorization: false,
        component: People,
      },
      {
        slug: "spirit",
        label: "영혼",
        navigation: true,
        authorization: false,
        component: Spirit,
      },
      {
        slug: "nature",
        label: "자연",
        navigation: true,
        authorization: false,
        component: Nature,
      },
    ]
  },
  {
    path: [
      "/square",
      "/square/:squareChild1",
    ],
    slug: "square",
    label: "광장",
    navigation: true,
    authorization: false,
    component: Square,
    submenu: [
      {
        slug: "photo",
        label: "사진",
        navigation: true,
        authorization: false,
        component: Photo,
      },
      {
        slug: "center",
        label: "센터",
        navigation: true,
        authorization: false,
        component: Center,
      },
      {
        slug: "product",
        label: "상품",
        navigation: true,
        authorization: false,
        component: Product,
      },
    ]
  },
  {
    path: [
      "/story",
      "/story/:storyChild1",
    ],
    slug: "story",
    label: "스토리",
    navigation: true,
    authorization: false,
    component: Story,
    submenu: [
      {
        slug: "love",
        label: "러브",
        navigation: true,
        authorization: false,
        component: Love,
      },
      {
        slug: "food",
        label: "푸드",
        navigation: true,
        authorization: false,
        component: Food,
      },
      {
        slug: "money",
        label: "머니",
        navigation: true,
        authorization: false,
        component: Money,
      },
    ]
  },
  {
    path: [
      "/member",
      "/member/login",
      "/member/user",
      "/member/logout",
    ],
    slug: "member",
    label: "회원",
    navigation: true,
    authorization: false,
    component: Member,
    submenu: [
      {
        slug: "login",
        label: "로그인",
        navigation: TrueToFalse,
        authorization: FalseToTrue,
        component: Login,
      },
      {
        slug: "user",
        label: "회원정보",
        navigation: FalseToTrue,
        authorization: TrueToFalse,
        component: User,
      },
      {
        slug: "logout",
        label: "로그아웃",
        navigation: FalseToTrue,
        authorization: TrueToFalse,
        component: Logout,
      },
    ]
  },
  {
    path: [
      "/finder",
    ],
    slug: "finder",
    label: "검색",
    navigation: false,
    authorization: false,
    component: Finder,
  },
  {
    path: [
      "/notfound"
    ],
    slug: "notfound",
    label: "NotFound",
    navigation: false,
    authorization: false,
    component: NotFound,
  },
];
export default Menus;