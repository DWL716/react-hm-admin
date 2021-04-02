import LocalStore from '../../../utils/LocalStore'

export const setTheme = (value: string) => ({
  type: 'SET_THEME',
  theme: value
});

export const setDrawer = (value: boolean) => ({
  type: 'SET_DRAWER',
  drawer: value
})
export const setPrimaryColor = (value: string) => {
  LocalStore.set('primary-color', value)
  return {
    type: 'SET_PRIMARY_COLOR',
    primaryColor: value
  }
}
export const setLanguage = (value: string) => {
  LocalStore.set('language', value)
  return {
    type: 'SET_LANGUAGE',
    language: value
  }
}