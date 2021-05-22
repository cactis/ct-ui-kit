import { NavigationActions } from 'react-navigation'

let _navigator

export class NavigationService {
  static setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef
  }

  static goBack = (callback = () => { }) => {
    // log(_navigator, '_navigator')
    // let { state } = _navigator
    // let { nav } = state
    // let { index, routes } = nav
    // log(routes[index], 'routes[index]')
    // log(_navigator.state?.routeName, '_navigator.state?.routeName')
    // if (
    //   _navigator.state &&
    //   _navigator.state?.routeName?.indexOf('ShowScreen') == -1
    // ) {
    //   alert('go')
    window.keyboardInput?.close()
    // }
    log('goBack in NavigationService')
    // runLast(() => {
    _navigator.dispatch(NavigationActions.back())
    // }, 200)
    delayed(() => {
      callback()
    })
  }

  static navigate = (routeName, params = {}) => {
    // log(`||| ${routeName} ||| screen -- 2`)
    let key = `${routeName}_${params.data?.id}`
    if(window.currentKey == key) return log('duplicate click')
    // log(key, 'key from NavigationService navigate()')
    // log(_navigator, '_navigator')
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        key: key,
      })
    )
    window.currentKey = key
    setTimeout(() => {
      window.currentKey = null
    }, 3000)
  }
}

window.gotoScreen = (screenName, options = {}) => {
  log(screenName, 'screenName#')
  T.NavigationService.navigate(screenName, options)
}

window.goBack = () => {
  T.NavigationService.goBack()
}
