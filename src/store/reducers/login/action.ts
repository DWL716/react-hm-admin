import loginUtils from '../../../utils/loginUtils'
import {login} from '../../../http/bureauLevel'

export const loginAction = () => ({
  type: 'IS_LOGIN',
  isLogin: true
});
export const loginOut = () => {
  // loginUtils.deleteLoginState()
  return {
    type: 'LOGIN_OUT',
    isLogin: false
  }
}

export const loginActionFath = () => ({
  type: 'LOGIN_ACTION',
  isLogin: true
})


export const loginActionPromise = (value: any) => {

  // 将 token 存储到本地 local storage
  return (dispatch: (arg0: { type: string; isLogin: boolean; }) => void, getState: any) => {
    login(value).then((res: any) => {
      console.log(res);
      dispatch(loginActionFath())
      loginUtils.saveLoginState(res.token)
    })
  }
}