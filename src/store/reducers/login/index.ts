const initialStore = {
  isLogin: false
}

interface IAction {
  type: string;
  [propName: string]: any
}

function reducer(store = initialStore, action: IAction) {
  
  switch(action.type) {
    case 'IS_LOGIN':
      return {...store, isLogin: action.isLogin};
    case 'LOGIN_ACTION':
      return {...store, isLogin: action.isLogin};
    default:
      return store;
  }
}


export default reducer;