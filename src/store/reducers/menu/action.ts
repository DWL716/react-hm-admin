import { menu } from '../../../http/menu'

export const setMenu = (value: any) => {
  return {
    type: 'SET_MENU',
    sildMenu: value
  }
}

export const setCurrentTopMenu = (value: any) => {
  return {
    type: 'SET_CURRENT_TOP_MENU',
    currentTopMenu: value
  }
}

export const setCurrentMenu = (value: any) => {
  return {
    type: 'SET_CURRENT_MENU',
    currentTopMenu: value,
  }
}

export const getHttpMenu = (pathname: any) => {
  return (dispatch: any, getStore: any) => {
    menu().then(res => {
      dispatch(setMenu(JSON.parse(res.data)))
    })
  }
}
