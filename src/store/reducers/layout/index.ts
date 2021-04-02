import LocalStore from '../../../utils/LocalStore';


const initialStore = {
  theme: LocalStore.get('theme') || 'dark',
  language: LocalStore.get("language") || "zh_CN",
  drawer: false,
  primaryColor: LocalStore.get('primary-color') || '#3d2006',
}

interface IAction {
  type: string;
  [propName: string]: any
}

function reducer(store = initialStore, action: IAction) {
  
  switch(action.type) {
    case 'SET_THEME':
      return {...store, theme: action.theme};
    case 'SET_LANGUAGE':
      return {...store, language: action.language};
    case 'SET_DRAWER':
      return {...store, drawer: action.drawer};
    case 'SET_PRIMARY_COLOR':
      return {...store, primaryColor: action.primaryColor};
    default:
      return store;
  }
}

export default reducer