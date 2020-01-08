import { NavigationActions } from 'react-navigation'

let _navigator

export class NavigationService {
  static setTopLevelNavigator = navigatorRef => {
    _navigator = navigatorRef
  }

  static goBack = () => {
    log('goBack in NavigationService')
    runLast(() => {
      _navigator.dispatch(NavigationActions.back())
    }, 200)
  }

  // static push = (routeName, params = {}) => {
  //   navigate(routeName, params)
  // }
  static navigate = (routeName, params = {}) => {
    let key = `${routeName}_${params.data?.id}`
    if (global.currentKey == key) return log('duplicate click')
    log(key, 'key from NavigationService navigate()')
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        key: key,
      })
    )
    global.currentKey = key
    setTimeout(() => {
      global.currentKey = null
    }, 3000)
  }
}
