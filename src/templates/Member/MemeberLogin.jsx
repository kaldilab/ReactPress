import React, { useState, useEffect } from 'react';
import { ApiAuthToken, ApiAuthValid } from 'settings/Api';
import Section from 'layouts/Section';
import * as Form from 'components/Form';
import * as Loading from 'components/Loading';
import * as GetUtils from 'utils/GetUtils';
import * as GetRoute from 'utils/GetRoute';
import * as GetMenu from 'utils/GetMenu';
import * as GetAuth from 'utils/GetAuth';

export default function MemeberLogin(props) {

  const routeSlug = GetRoute.RouteSlug();
  const routeState = GetRoute.RouteState();
  const gotoFrom = (routeState) ? routeState.from : GetMenu.MenuUrl('user');
  const [userName, setUserName] = useState([]);
  const [userPassword, setUserPassword] = useState([]);
  const [isLoadingPart, setIsLoadingPart] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [authInvalid, setAuthInvalid] = useState(false);
  const [authInvalidMessage, setAuthInvalidMessage] = useState([]);
  const authInvalidClass = (authInvalid) ? 'is-invalid' : '';
  const handleUserNameChange = (event) => {
    const { value } = event.target;
    setUserName(value);
  }
  const handleUserPasswordChange = (event) => {
    const { value } = event.target;
    setUserPassword(value);
  }
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    getAuthToken();
  }
  const getAuthToken = async () => {
    const AuthToken = ApiAuthToken();
    await AuthToken
      .create({
        username: userName,
        password: userPassword
      })
      .then(response => {
        if (response.success === true && response.statusCode === 200) {
          GetAuth.SetStoreAuthToken(response.data.token);
          GetAuth.SetStoreAuthUserId(response.data.id);
          setAuthSuccess(true);
          setIsLoadingPart(true);
        } else {
          setAuthInvalid(true);
          setAuthInvalidMessage(response.message);
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(
    () => {
      if (authSuccess) {
        const getAuthValid = async () => {
          const AuthValid = ApiAuthValid();
          await AuthValid
            .create()
            .then(response => {
              if (response.success === true && response.statusCode === 200) {
                if (response.data.id === GetAuth.GetStoreAuthUserId()) {
                  GetAuth.SetStoreAuthValid(true);
                }
              }
            })
            .then(() => {
              GetUtils.GetGoto(gotoFrom);
            })
            .catch(error => console.log(error));
        }
        getAuthValid();
      }
    },
    [authSuccess, gotoFrom]
  )

  return (
    <React.Fragment>
      <h3 className="mb-5">{GetMenu.MenuLabel(routeSlug)}</h3>
      <Section sectionClass={'section'} srTitle={GetMenu.MenuLabel(routeSlug)}>
        <Form.CTForm
          formClass={'w-50 mx-auto pt-3'}
          onSubmit={handleLoginSubmit}
        >
          <Form.CTFormText
            id={'formUserName'}
            label={'아이디 또는 이메일'}
            controlClass={authInvalidClass}
            type={'text'}
            placeholder={'아이디 또는 이메일을 입력하세요.'}
            onChange={handleUserNameChange}
            value={userName}
          />
          <Form.CTFormText
            id={'formUserPassword'}
            label={'비밀번호'}
            controlClass={authInvalidClass}
            type={'password'}
            placeholder={'비밀번호를 입력하세요.'}
            onChange={handleUserPasswordChange}
            value={userPassword}
          />
          <Form.CTFormButton
            buttonClass={'btn-primary'}
            type={'submit'}
            value={'로그인'}
          />
          <Form.CTFormFeedback
            feedback={authInvalid}
            feedbackMessage={authInvalidMessage}
          />
        </Form.CTForm>
        {
          (isLoadingPart) && <Loading.CTLoadingFloat />
        }
      </Section>
    </React.Fragment>
  )

}