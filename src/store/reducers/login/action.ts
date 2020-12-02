
export const loginAction = () => ({
  type: 'IS_LOGIN',
  isLogin: true
});

export const loginActionFath = () => ({
  type: 'LOGIN_ACTION',
  isLogin: true
})

export const loginActionPromise = (value: any) => {
  console.log(value);
  
  return (dispatch: (arg0: () => { type: string; isLogin: boolean; }) => void, getState: any) => {
    console.log(getState(), 'getState');
    
    dispatch(loginActionFath() as any)
  }
}