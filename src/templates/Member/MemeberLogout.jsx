import React from 'react';
import * as GetUtils from 'utils/GetUtils';
import * as GetStorage from 'utils/GetStorage';

export default function MemeberLogout(props) {

  GetStorage.ClearLocalStore();
  GetUtils.GetGoto('/');

  return (
    <React.Fragment>
      <h4 className="text-center">로그아웃 중입니다...</h4>
    </React.Fragment>
  )

}