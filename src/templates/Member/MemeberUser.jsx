import React, { useState, useEffect, useRef } from 'react';
import { ApiAuthValid } from 'settings/Api';
import Section from 'layouts/Section';
import * as ListGroup from 'components/ListGroup';
import * as Loading from 'components/Loading';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';
import * as GetAuth from 'utils/GetAuth';

export default function MemeberUser(props) {

  const isMounted = useRef(false);
  const routeSlug = GetRoute.RouteSlug();
  const [userAvatar, setUserAvatar] = useState([]);
  const [userSlug, setUserSlug] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userUrl, setUserUrl] = useState([]);
  const [userDescription, setUserDescription] = useState([]);
  const [isLoadingPart, setIsLoadingPart] = useState(true);

  // User
  useEffect(
    () => {
      isMounted.current = true;
      const getUser = async () => {
        const AuthValid = ApiAuthValid(GetAuth.GetStoreAuthToken());
        AuthValid
          .create()
          .then(response => {
            if (isMounted.current) {
              setUserAvatar(response.data.avatar);
              setUserSlug(response.data.slug);
              setUserName(response.data.name);
              setUserEmail(response.data.email);
              setUserUrl(response.data.url);
              setUserDescription(response.data.excerpt);
              setIsLoadingPart(false);
            }
          })
          .catch(error => console.log(error));
      }
      getUser();
      return () => {
        isMounted.current = false;
      }
    },
    []
  );

  const ListGroupData = [
    {
      title: "아바타",
      image: userAvatar,
    },
    {
      title: "닉네임",
      excerpt: userSlug,
    },
    {
      title: "이름",
      excerpt: userName,
    },
    {
      title: "이메일",
      excerpt: userEmail,
    },
    {
      title: "홈페이지",
      excerpt: userUrl,
    },
    {
      title: "소개",
      excerpt: userDescription,
    },
  ]

  return (
    <React.Fragment>
      <h3 className="mb-5">{GetMenu.MenuLabel(routeSlug)}</h3>
      <Section sectionClass={'section w-50 mx-auto'} srTitle={GetMenu.MenuLabel(routeSlug)}>
        <ListGroup.CTListGroup>
          {
            (isLoadingPart)
              ?
              <Loading.CTLoadingLi />
              :
              ListGroupData.map((item, index) =>
                <ListGroup.CTListGroupItem
                  key={index}
                  title={item.title}
                  excerpt={item.excerpt}
                  image={item.image}
                />
              )
          }
        </ListGroup.CTListGroup>
      </Section>
    </React.Fragment>
  )

}