import {getAllBranch, addBranch} from '../../../../http/system/branch'

export const getUserSelect = (value: any) => ({
  type: 'GET_USER_SELECT',
  userSelect: value,
})



export const getUserSelectPromise = () => {
  return (dispatch: any, getState: any) => {
    getAllBranch().then((res) => {
      console.log(res, '局站管理');
      dispatch(getUserSelect(JSON.parse(res.data)))
    })
  }
}

export const setUserSelectPromise = (parentId: any,name: any) => {
  return(dispatch: any, getState: any) => {
    addBranch(parentId,name).then((res) => {
      console.log(res);
      
    })
  }
}