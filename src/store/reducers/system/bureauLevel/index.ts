const initialStore = {
  userSelect: []
}

interface IAction {
  type: string;
  [propName: string]: any
}

function reducer(store = initialStore, action: IAction) {
  
  switch(action.type) {
    case 'GET_USER_SELECT':
      return {...store, userSelect: action.userSelect};
    default:
      return store;
  }
}


export default reducer;