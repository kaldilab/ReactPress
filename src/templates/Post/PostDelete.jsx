import React from 'react';
import { ApiAuth } from 'settings/Api';
import * as Button from 'components/Button';
import * as GetUtils from 'utils/GetUtils';
import * as GetRoute from 'utils/GetRoute';

export default function PostDelete(props) {

  const routeParams = GetRoute.RouteParams('postId');
  const PostId = !isNaN(routeParams) ? routeParams : false;
  const gotoBack = GetRoute.RouteUrl().replace('/_view/' + PostId, '');
  const deletePosts = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const Posts = ApiAuth().posts().id(PostId);
      await Posts
        .delete()
        .then(response => {
          if (response) {
            alert('글이 삭제되었습니다.');
            GetUtils.GetGoto(gotoBack);
          } else {
            GetUtils.GetGoto('/notfound');
          }
        })
        .catch(error => console.log(error));
    } else {
      return false;
    }
  };
  (!PostId) && GetUtils.GetGoto('/notfound');

  return (
    <React.Fragment>
      <Button.CTButton
        type={'basic'}
        buttonClass={'btn-danger'}
        onClick={deletePosts}
        title={'삭제'}
      />
    </React.Fragment>
  )

}