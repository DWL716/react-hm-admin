import loginUtils from '../../../utils/loginUtils'

export const loginAction = () => ({
  type: 'IS_LOGIN',
  isLogin: true
});
export const loginOut = () => ({
  type: 'LOGIN_OUT',
  isLogin: false
})

export const loginActionFath = () => ({
  type: 'LOGIN_ACTION',
  isLogin: true
})

export const loginActionPromise = (value: any) => {
  console.log(value);
  const token = 'abs.abs.abs'
  // 将 token 存储到本地 local storage
  loginUtils.saveLoginState(token)
  
  return (dispatch: (arg0: () => { type: string; isLogin: boolean; }) => void, getState: any) => {
    console.log(getState(), 'getState');
    
    dispatch(loginActionFath() as any)
  }
}